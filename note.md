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