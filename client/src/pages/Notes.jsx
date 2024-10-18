import { React, useState, useEffect } from 'react'
// import { Sidebar } from "flowbite-react";
import {
    HiArrowSmRight,
    HiClipboard,
    HiChartPie,
    HiInbox,
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiShoppingBag,
    HiTable,
    HiUser,
    HiMenuAlt2
} from "react-icons/hi";
import { twMerge } from "tailwind-merge";
import { useParams } from 'react-router-dom';
import { Button, Drawer, Sidebar, TextInput } from "flowbite-react";
import TopNav from '../components/Navbar';




const Notes = () => {

    const { id } = useParams()
    const [course, setCourse] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const endpount = import.meta.env.VITE_KEYSTONE;

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);

    useEffect(() => {
        fetchCourse(id)
    }, [id])

    const fetchCourse = async (couseId) => {
        const query = `
            query {
                courses(where: {id: { equals: "${couseId}"}}) {
                    id
                    title
                    chapter {
                        id
                        title
                        submodules {
                            id 
                            title
                            notes{
                                id
                                content {
                                    document
                                }
                            }
                        }
                    }
                }
            }
        `

        try {
            const response = await fetch(endpount, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ query })
            })

            const data = await response.json()
            console.log(data);

            if (data.errors) {
                setError(data.errors);
                console.error("GraphQL Errors:", data.errors);
                return;  // Exit the function if there's an error
            }

            setCourse(data.data.courses[0])
        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading course details</div>;
    if (!course) return <div>No course found</div>;

    const renderRichText = (document) => {
        if (!document || !Array.isArray(document)) {
            console.log('Invalid document structure:', document);
            return null;
        }

        return document.map((node, index) => {
            switch (node.type) {
                case 'paragraph':
                    return <p key={index}>{node.children?.map(child => renderText(child)).join(' ')}</p>;

                case 'unordered-list':
                    return (
                        <ul key={index}>
                            {node.children?.map((listItem, listItemIndex) => (
                                <li key={listItemIndex}>
                                    {listItem.children?.map(listItemContent =>
                                        listItemContent.children?.map(subChild => renderText(subChild)).join(' ')
                                    )}
                                </li>
                            ))}
                        </ul>
                    );

                case 'ordered-list':
                    return (
                        <ol key={index}>
                            {node.children?.map((listItem, listItemIndex) => (
                                <li key={listItemIndex}>
                                    {listItem.children?.map(listItemContent =>
                                        listItemContent.children?.map(subChild => renderText(subChild)).join(' ')
                                    )}
                                </li>
                            ))}
                        </ol>
                    );

                case 'list-item':
                    return (
                        <li key={index}>
                            {node.children?.map(listItemContent =>
                                listItemContent.children?.map(subChild => renderText(subChild)).join(' ')
                            )}
                        </li>
                    );

                default:
                    return <div key={index}>Unknown node type: {node.type}</div>;
            }
        });
    };

    const renderText = (textNode) => {
        if (!textNode.text) return null;

        let formattedText = textNode.text;

        // Apply bold
        if (textNode.bold) {
            formattedText = <strong>{formattedText}</strong>;
        }

        // Apply italic
        if (textNode.italic) {
            formattedText = <em>{formattedText}</em>;
        }

        return formattedText;
    };

    return (
        <div>
            <TopNav />
            <div className="flex h-auto items-start">
                <Button onClick={() => setIsOpen(true)} className='bg-slate-400'><HiMenuAlt2 className='text-xl text-bold text-black' /></Button>
            </div>
            <Drawer open={isOpen} onClose={handleClose} className='w-auto'>
                <Drawer.Header title="MENU" titleIcon={() => <></>} />
                <Drawer.Items>
                    <Sidebar aria-label="Sidebar with multi-level dropdown example" className='w-full'>
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                                {course.chapter.map((chapter) => (
                                    <div>
                                        <Sidebar.Collapse
                                            key={chapter.id}
                                            icon={HiShoppingBag}
                                            label={chapter.title}
                                            renderChevronIcon={(theme, open) => {
                                                const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                                return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                                            }}
                                        >
                                            <div>
                                                {chapter.submodules && chapter.submodules.map((submodule) => (
                                                    <Sidebar.Item href="#" key={submodule.id}>{submodule.title}</Sidebar.Item>
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
        </div>
    )
}

export default Notes