import { React, useState, useEffect } from 'react';
import {
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiShoppingBag,
    HiMenuAlt2
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { useParams } from 'react-router-dom';
import { Button, Drawer, Sidebar } from "flowbite-react";
import TopNav from '../components/Navbar';
import Loading from '../components/Loading';

const Notes = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isOpen, setIsOpen] = useState(true);
    const [selectedSubmodule, setSelectedSubmodule] = useState(null); // Track selected submodule

    // const endpount = import.meta.env.VITE_KEYSTONE;
    const endpoint = 'https://caea-102-0-15-152.ngrok-free.app'


    const handleClose = () => setIsOpen(false);

    useEffect(() => {
        fetchCourse(id);
    }, [id]);

    const fetchCourse = async (courseId) => {
        const query = `
            query {
                courses(where: {id: { equals: "${courseId}"}}) {
                    id
                    title
                    chapter {
                        id
                        title
                        submodules {
                            id 
                            title
                            notes {
                                id
                                content {
                                    document
                                }
                            }
                        }
                    }
                }
            }
        `;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ query })
            });

            const data = await response.json();
            console.log(data);

            if (data.errors) {
                setError(data.errors);
                console.error("GraphQL Errors:", data.errors);
                return;
            }

            const fetchedCourse = data.data.courses[0];
            setCourse(fetchedCourse);

            // Automatically set the first submodule to be selected by default
            if (fetchedCourse.chapter.length > 0 && fetchedCourse.chapter[0].submodules.length > 0) {
                setSelectedSubmodule(fetchedCourse.chapter[0].submodules[0]);
            }

        } catch (error) {
            console.error(error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmoduleClick = (submodule) => {
        setSelectedSubmodule(submodule); // Set the clicked submodule as the selected one
    };

    const renderRichText = (document) => {
        if (!document || !Array.isArray(document)) {
            console.log('Invalid document structure:', document);
            return null;
        }

        return document.map((node, index) => {
            switch (node.type) {
                case 'paragraph':
                    return <p key={index}>{node.children?.map((child, childIndex) => renderText(child, childIndex))}</p>;

                case 'unordered-list':
                    return (
                        <ul key={index} className='list-disc'>
                            {node.children?.map((listItem, listItemIndex) => (
                                <li key={listItemIndex} className='mx-10 my-3'>
                                    {listItem.children?.map((listItemContent, contentIndex) =>
                                        listItemContent.children?.map((subChild, subChildIndex) => renderText(subChild, subChildIndex))
                                    )}
                                </li>
                            ))}
                        </ul>
                    );

                case 'ordered-list':
                    return (
                        <ol key={index}c className='list-decimal'>
                            {node.children?.map((listItem, listItemIndex) => (
                                <li key={listItemIndex} className='mx-10 my-3'>
                                    {listItem.children?.map((listItemContent, contentIndex) =>
                                        listItemContent.children?.map((subChild, subChildIndex) => renderText(subChild, subChildIndex))
                                    )}
                                </li>
                            ))}
                        </ol>
                    );

                case 'paragraph':
                    return (
                        <span key={index}>
                            {node.children?.map((paragraphText, paragraphIndex) => {
                                <p key={paragraphIndex} className='text-red-500'>
                                    {paragraphText.children?.map((text) => {
                                        text.children?.map((subChild,subChildIndex) => renderText(subChild, subChildIndex))
                                    })}
                                </p>
                            })}
                        </span>

                    )

                default:
                    return <div key={index}>Unknown node type: {node.type}</div>;
            }
        });
    };

    const renderText = (textNode, key) => {
        if (!textNode.text) return null;

        let formattedText = textNode.text;

        if (textNode.bold) {
            formattedText = <strong key={key}>{formattedText}</strong>;
        }

        if (textNode.italic) {
            formattedText = <em key={key}>{formattedText}</em>;
        }

        if (textNode.text) {
            formattedText = <span key={key} className=''>{formattedText}</span>
        }

        return formattedText;
    };

    if (loading) return <Loading />;
    if (error) return <div>Error loading course details</div>;
    if (!course) return <div>No course found</div>;

    return (
        <div>
            <TopNav />
            <div className="flex h-auto items-start">
                <Button onClick={() => setIsOpen(true)} className='bg-slate-200'>
                    <HiMenuAlt2 className='text-xl text-bold text-black' />
                </Button>
            </div>
            <Drawer open={isOpen} onClose={handleClose} className='w-auto fixed'>
                <Drawer.Header title="MENU" titleIcon={() => <></>} />
                <Drawer.Items>
                    <Sidebar aria-label="Sidebar with multi-level dropdown example" className='w-full'>
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                {course.chapter.map((chapter) => (
                                    <div key={chapter.id}>
                                        <Sidebar.Collapse
                                            icon={HiShoppingBag}
                                            label={chapter.title}
                                            renderChevronIcon={(theme, open) => {
                                                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
                                                return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                                            }}
                                        >
                                            <div>
                                                {chapter.submodules && chapter.submodules.map((submodule) => (
                                                    <Sidebar.Item
                                                        key={submodule.id}
                                                        onClick={() => handleSubmoduleClick(submodule)}
                                                        className="cursor-pointer"
                                                    >
                                                        {submodule.title}
                                                    </Sidebar.Item>
                                                ))}
                                            </div>
                                        </Sidebar.Collapse>
                                    </div>
                                ))}
                            </Sidebar.ItemGroup>
                        </Sidebar.Items>
                    </Sidebar>
                </Drawer.Items>
            </Drawer>

            <div className='flex w-full justify-center items-center '>
                <div className="flex flex-col justify-center items-center py-10 px-14 shadow-lg">
                    {selectedSubmodule ? (
                        <div>
                            {/* <h3>{selectedSubmodule.title}</h3> */}

                            {selectedSubmodule.notes && selectedSubmodule.notes.length > 0 ? (
                                selectedSubmodule.notes.map((note) => (
                                    <div key={note.id}>
                                        {note.content && Array.isArray(note.content.document) ? (
                                            renderRichText(note.content.document) // Render rich text blocks
                                        ) : (
                                            <p>No content available</p>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <p>No notes available</p>
                            )}
                        </div>
                    ) : (
                        <p>Select a submodule to view notes</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Notes;
