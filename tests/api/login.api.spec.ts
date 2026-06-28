
import {test,expect} from '@playwright/test'

const BASE_URL = 'https://rytuai.in';

test.describe('Auth API Tests ',()=>{

    test('TC01: POST /auth/login - Valid credentials return 200 and token',async({request})=>{
        const response = await request.post(`${BASE_URL}/auth/login`,{
            data:{
                phone:process.env.TEST_PHONE,
                password:process.env.TEST_PASSWORD
            }
        })
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.message).toBe('Login successful!');
        expect(body.token).toBeTruthy();
        expect(body.farmer.phone).toBe(process.env.TEST_PHONE);
    })

    test('TC02: POST/auth/login - Invalid Password Credentials return 400 and falsy token',async({request})=>{

        const response = await request.post(`${BASE_URL}/auth/login`,{
            data:{
                phone:process.env.TEST_PHONE,
                password:'Mohan'
            }
        })
        expect(response.status()).toBe(400)
        const body = await response.json();
        expect(body.token).toBeFalsy()
        expect(body.message).toBe('Incorrect password. Please try again.')


    })

    test('TC03: POST/auth/login - Invalid Phone number return 400 and Falsy token',async({request})=>{
        const response = await request.post(`${BASE_URL}/auth/login`,{
           data:{
            phone:'9550108',
            password:process.env.TEST_PASSWORD,
           }
        })  
        expect(response.status()).toBe(400)
        const body = await response.json()
        expect(body.token).toBeFalsy()
    
        
    })

    test('TC04: POST/auth/login - Invalid Phone and password return 400 and Falsy token',async({request})=>{
        const response = await request.post(`${BASE_URL}/auth/login`,{
            data:{
                phone:'9768906890',
                password:'Sai@34556'
            }
        })
        expect(response.status()).toBe(400)
        const body = await response.json();
        expect(body.message).toBe('Phone number not registered. Please sign up.')
        expect(body.token).toBeFalsy()
    })

})