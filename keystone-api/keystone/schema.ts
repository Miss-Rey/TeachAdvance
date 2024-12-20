// Welcome to your schema
//   Schema driven development is Keystone's modus operandi
//
// This file is where we define the lists, fields and hooks for our data.
// If you want to learn more about how lists are configured, please read
// - https://keystonejs.com/docs/config/lists

import { list } from '@keystone-6/core'
import { allowAll } from '@keystone-6/core/access'
// see https://keystonejs.com/docs/fields/overview for the full list of fields
//   this is a few common fields for an example
import {
  text,
  relationship,
  password,
  timestamp,
  select,
  file,
  image
} from '@keystone-6/core/fields'


// the document field is a more complicated field, so it has it's own package
import { document } from '@keystone-6/fields-document'
// if you want to make your own fields, see https://keystonejs.com/docs/guides/custom-fields

// when using Typescript, you can refine your types to a stricter subset by importing
// the generated types from '.keystone/types'
import { type Lists } from '.keystone/types'
import { BaseAccessArgs, AccessOperation } from '@keystone-6/core/dist/declarations/src/types/config/access-control'
import { BaseListTypeInfo, MaybePromise } from '@keystone-6/core/types'

export const lists = {
  User: list({
    // WARNING
    //   for this starter project, anyone can create, query, update and delete anything
    //   if you want to prevent random people on the internet from accessing your data,
    //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
    access: allowAll,

    // this is the fields for our User list
    fields: {
      // by adding isRequired, we enforce that every User should have a name
      //   if no name is provided, an error will be displayed
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        // by adding isIndexed: 'unique', we're saying that no user can have the same
        // email as another user - this may or may not be a good idea for your project
        isIndexed: 'unique',
      }),

      password: password({ validation: { isRequired: true } }),

      // we can use this field to see what Posts this User has authored
      //   more on that in the Post list below
      createdAt: timestamp({
        // this sets the timestamp to Date.now() when the user is first created
        defaultValue: { kind: 'now' },
      }),
    },
  }),

  // this last list is our Tag list, it only has a name field for now

  Course: list({
    access: allowAll,
    fields: {
      title: text({validation: {isRequired: true}}),
      description: text({validation: {isRequired: true}}),
      author: text({validation: {isRequired: true}}),
      language: text(),
      duration: text({validation: {isRequired:true}}),
      thumbnail: image({
        label: 'Course Thumbnail',
        storage: 'my_local_images'
      }),
      chapter: relationship({
        ref: 'Chapter.course',
        many: true
      }),
      objectives: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
        links: true,
        dividers: true,
      }),
      audience: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
        links: true,
        dividers: true,
      }),
    },
  }),

  Chapter: list({
    access: allowAll,
    fields: {
      title: text({validation: {isRequired: true}}),
      submodules: relationship({
        ref: 'Submodule.chapter',
        many: true
      }),
      course: relationship({ref: 'Course.chapter'})
    },
  }),

  Submodule: list({
    access: allowAll,
    fields: {
      title: text({validation: {isRequired: true}}),
      chapter: relationship({
        ref: 'Chapter.submodules',
      }),
      notes: relationship({ 
        ref: 'Note.submodule', 
        many: true 
      }),
      
    },
  }),

  Note: list({
    access: allowAll,
    fields: {
      content: document({
        formatting: true,
        layouts: [
          [1, 1],
          [1, 1, 1],
        ],
        links: true,
        dividers: true,
      }),
      submodule: relationship({
        ref: 'Submodule.notes',
      }),
    },
  })
} satisfies Lists

