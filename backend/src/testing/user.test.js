const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
afterAll(async () => {
    await mongoose.connection.close();
});

describe('fetching profile',()=>{
    test('should return 200 user profile',async ()=>{
        const registeruser = await request(app)
        .post('/api/auth/register')
        .send({
            username:'addditya123',
            email:'adddityyya.kumar140706@gmail.com',
            password:'Aditya@123'
        })
        const loginuser = await request(app)
        .post('/api/auth/login')
        .send({
            username:'addditya123',
            password:'Aditya@123'
        })
        const cookie = loginuser.headers['set-cookie']
        const response = await request(app)
        .get('/api/user/profile')
        .set('cookie',cookie)
        expect(response.statusCode).toBe(200)
    })

    test('Should return 401 unauthorized user',async ()=>{
        const response = await request(app)
        .get('/api/user/profile');
        expect(response.statusCode).toBe(401)
    })
}) 

describe('Updating profile',()=>{
    test('should return 200 for profile update',async ()=>{
        const loginuser = await request(app)
        .post('/api/auth/login')
        .send({
            username:'addditya123',
            password:'Aditya@123'
        })
        const cookie = loginuser.headers['set-cookie']
        const response = await request(app)
        .put('/api/user/updateprofile')
        .set('cookie',cookie)
        .send({
            username:'its_aditya',
            bio:'hello i am aditya and i have updated the bio'
        })
        expect(response.statusCode).toBe(200)
    })
    test('should return 409 username already exists',async ()=>{
        const loginuser = await request(app)
        .post('/api/auth/login')
        .send({
            username:'its_aditya',
            password:'Aditya@123'
        })
        const cookie = loginuser.headers['set-cookie']
        const response = await request(app)
        .put('/api/user/updateprofile')
        .set('cookie',cookie)
        .send({
            username:'additya123',
        })
        expect(response.statusCode).toBe(409)
    })
})

describe('Get user profile pic',()=>{
    test('should return 200 profile pic fetched sucessfully', async ()=>{
        const loginuser= await request(app)
        .post('/api/auth/login')
        .send({
            username:'its_aditya',
            password:'Aditya@123'
        })
        const cookie = loginuser.headers['set-cookie']
        const response = await request(app)
        .get('/api/user/profilepicture')
        .set('cookie',cookie)
        expect(response.statusCode).toBe(200)
    })
})

describe('Get someone profile',()=>{
    test('should return 200 for someone profile', async ()=>{
        const usermodel = require('../Model/userShema')
        const user = await usermodel.findOne({username: 'its_aditya'})
        const response = await request(app)
        .get(`/api/user/profile/${user._id}`)
        expect(response.statusCode).toBe(200)
    })
})