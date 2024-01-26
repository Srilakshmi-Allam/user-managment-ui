# User Management Backend Core API Module

This module provides core UI functionality for handling user-related operations, including User, Roles, Screens, UserGroup, etc., in the front end of your application. It encompasses business logic for creating and manipulating these entities.

## Configuration

Before using this module, you need to configure it by passing necessary environment variables and establishing who importing this module

### 1. Environment Variables

Ensure the following environment variables are set:

-   USER_MANAGMENT_API: - Initialize api url 


## Installation

1. Install the module as a dependency in your project:

   ```bash
   npm install @exalent/user-management

## Usage

1. Initialize this module before using the logic
   `
    import { initialize }  from '@exalent/user-management/dist'
    initialize({
      USER_MANAGMENT_API: EXALENT_BENEFITS_API
    })
   `
2. Importing the modules

    `
        import {
            getPages,
            getReducers
        } from "@exalent/user-management/dist";

        const {
            Users,
            CreateUser,
            UpdateUser,
            UpdateModule,
            Modules,
            Roles,
            EditRole,
            Screens,
            UpdateScreen,
            Groups,
            UpdateGroup
        } = getPages();

        const {
            groupsReducer,
            usersReducer,
            rolesReducer,
            modulesReducer,
            screensReducer,
        } = getReducers();
    `

