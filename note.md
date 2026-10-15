                    PLAYWRIGHT
                        |
                ----------------
                |              |
          Common use       Projects
                |              |
          baseURL         DEV / QA / STAGING
          headless        |
          screenshot      ├── Desktop Chrome
          video           ├── Desktop Chrome
                          └── Desktop Chrome



AND COMMAND :

    --project=dev
        ↓
    select DEV project
        ↓
    .env.dev already loaded
        ↓
    BASE_URL = dev URL
        ↓
    Desktop Chrome
        ↓
    run test



    ///env files 

//.env.dev - filename:

    #authentication details:
EMAIL=admin@nitc.ac.in
PASSWORD=password

//routes
BASE_URL=https://mis.dev.nitc.ac.in
//after login
DASHBOARD_URL=https://mis.dev.nitc.ac.in/apps
//profile image in create user 
PROFILE_IMAGE_PATH=public/user.jpg


.env.qa:

#authentication details:
EMAIL=admin@nitc.ac.in
PASSWORD=password

//routes
BASE_URL=https://mis.qa.nitc.ac.in
//after login
DASHBOARD_URL=https://mis.qa.nitc.ac.in/apps
//profile image in create user 
PROFILE_IMAGE_PATH=public/user.jpg


//.env.staging:

#authentication details:
EMAIL=admin@nitc.ac.in
PASSWORD=password

//routes
BASE_URL=https://mis.staging.nitc.ac.in
//after login
DASHBOARD_URL=https://mis.staging.nitc.ac.in/apps
//profile image in create user 
PROFILE_IMAGE_PATH=public/user.jpg
