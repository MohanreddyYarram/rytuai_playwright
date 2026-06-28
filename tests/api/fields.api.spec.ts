import {test,expect, request} from '@playwright/test'
const BASE_URL = 'https://rytuai.in';
test.describe('Fields API Tests',()=>{
    let token:string
    test.beforeAll(async({request})=>{
        const response = await request.post(`${BASE_URL}/auth/login/`,{
            data:{
                phone:process.env.TEST_PHONE,
                password:process.env.TEST_PASSWORD
            }
        });
        const body = await response.json();
        token = body.token

    })
    test('TC01: GET /fields/farmerphone return 200 and list of fields',async({request})=>{
        const response = await request.get(`${BASE_URL}/fields/${process.env.TEST_PHONE}`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body.fields).toBeTruthy()
        expect(body.fields.length).toBeGreaterThan(0)
        expect(body.fields[0].farmer_id).toBe(process.env.TEST_PHONE)
    })
    test('TC02: GET/fields/farmerphone return 401 ',async({request})=>{
        const response = await request.get(`${BASE_URL}/fields/${process.env.TEST_PHONE}`)
        expect(response.status()).toBe(401);

    })
    test('TC03: GET Fields with Invalid token',async({request})=>{
        const response = await request.get(`${BASE_URL}/fields/${process.env.TEST_PHONE}`,{
            headers:{
                'Authorization':`Bearer InvalidToken123`
            }
            
        })
        expect(response.status()).toBe(401)
    });

    test('TC04: GET Fields for wrong phone number',async({request})=>{
        const response = await request.get(`${BASE_URL}/fields/955010834`,{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        expect(response.status()).toBe(200)
        const body = await response.json()
        expect(body.fields.length).toBe(0)

    })

})