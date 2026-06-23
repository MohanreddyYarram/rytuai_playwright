
import dotenv from 'dotenv'

dotenv.config()

import {defineConfig} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    retries: 1,


    use: { 
        baseURL: 'https://www.rytuai.in',    
        
        headless: false,
        screenshot: 'only-on-failure',
        viewport: {width: 1280, height: 720},
        actionTimeout: 10 * 1000,
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
        trace: 'on-first-retry',
        permissions: ['geolocation'],
        geolocation: { latitude: 15.9129, longitude: 79.9400 },
    },

    reporter: [['html',{open: 'never'}]],
    projects: [
        {name: 'chromium',
            use: {
                browserName: 'chromium',        
            },
        },
    ],
});