const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
afterAll(async () => {
    await mongoose.connection.close();
});

describe('Register API',()=>{
    test('Should return 201 status',async ()=>{
        const response = await request(app)
        .post('/api/auth/register')
        .send({
            username:'additya123',
            email:'addditya.kumar140706@gmail.com',
            password:'Aditya@123'
        });
        expect(response.statusCode).toBe(201)
        expect(response.body.success).toBe(true)
    });
    test('Should return 409 status',async ()=> {
        await request(app)
        .post('/api/auth/register')
        .send({
            username:'aditya123',
            email:'jadhjha@gmail.com',
            password:'Aditya@123'
        });
        const response = await request(app)
        .post('/api/auth/register')
        .send({
            username:'aditya123',
            email:'notduplicateemail@gmail.com',
            password:'Aditya@123'
        });
        expect(response.statusCode).toBe(409)
    })
    test('Should return 409 status',async ()=> {
        await request(app)
        .post('/api/auth/register')
        .send({
            username:'test123',
            email:'jadhjha@gmail.com',
            password:'Aditya@123'
        });
        const response = await request(app)
        .post('/api/auth/register')
        .send({
            username:'aditya12377',
            email:'jadhjha@gmail.com',
            password:'Aditya@123'
        });
        expect(response.statusCode).toBe(409)
    })
    test('should return 400 inavlid email', async () =>{
        const response = await request(app)
        .post('/api/auth/register')
        .send({
            username:'notemail',
            email:'notaemail',
            password:'Aditya@123'
        })
        expect(response.statusCode).toBe(400)
    })
    test('should return 400 week password', async ()=>{
        const response = await request(app)
        .post('/api/auth/register')
        .send({
            username:'xyzjhdj',
            email:'test@email.com',
            password:'weakpass'
        })
        expect(response.statusCode).toBe(400)
    })
})

describe('Login API',()=>{
    test('should return 200 Login success', async ()=>{
        const response = await request(app)
        .post('/api/auth/login')
        .send({
            username:'additya123',
            password:'Aditya@123'
        })
        console.log(response.body);
        expect(response.statusCode).toBe(200)
    })
    test('should return 404 username not found', async ()=>{
        const response = await request(app)
        .post('/api/auth/login')
        .send({
            username:'hello',
            password:'Aditya@123'
        })
        expect(response.statusCode).toBe(404)
    })
    test ('should return 401 password not matched', async ()=>{
        const response = await request(app)
        .post('/api/auth/login')
        .send({
            username:'additya123',
            password:'aaaaaaaa'
        })
        expect(response.statusCode).toBe(401)
    })
})



