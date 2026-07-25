const request = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const blogmodel= require('../Model/BlogSchema')
const UserModel = require('../Model/userShema')
const commentmodel = require('../Model/commentSchema')
const bycrpt = require('bcrypt')

afterAll(async () => {
    await mongoose.connection.close();
});
beforeAll(async () => {
    const hashedpassword = await bycrpt.hash('P@assword123',10)
    testUser = await UserModel.create({
        username: 'testuser',
        email: 'test@test.com',
        password: hashedpassword
    });
    testUser1 = await UserModel.create({
        username: 'testuser1',
        email: 'test1@test.com',
        password: hashedpassword
    });
    testblog = await blogmodel.create({
        title:'test blog 0 non delted',
        content:'test blog 0 content',
        author:testUser._id
    })
    testblog1 = await blogmodel.create({
        title:'test blog 1',
        content:'test blog 1 content',
        category:'Tech',
        author:testUser._id
    })
    testcomment1 = await commentmodel.create({
        username:testUser1._id,
        blog:testblog1._id,
        content:'Created comment by default'
    })
    testcomment2 = await commentmodel.create({
        username:testUser1._id,
        blog:testblog1._id,
        content:'Created comment by default'
    })
});

describe('creating blog',()=>{
    test('should return 201 create blog',async ()=>{
        const userregister = await request(app)
        .post('/api/auth/register')
        .send({
            username:'Akaash',
            email:'akassh@gmail.com',
            password:"Aditya@12"
        })
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .post('/api/blog/create')
        .set('cookie',cookie)
        .send({
            title:'Testing blog 1',
            content:'This is content of testing blog 1',
            category:'Tech'
        })
        expect(response.statusCode).toBe(201)
    })
})

describe('fetching blogs',()=>{
    test('should return 201 fetch blog',async()=>{
        const userlogin = await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .get('/api/blog/blogs')
        .set('cookie',cookie)
        expect(response.statusCode).toBe(201)
    })
    test('should return 201 single blog fetched',async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .get(`/api/blog/blog/${testblog._id}`)
        .set('cookie',cookie)
        expect(response.statusCode).toBe(201)
    })

    test('should return 201 fetch blog',async()=>{
        const userlogin = await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .get('/api/blog/blogs')
        .set('cookie',cookie)
        expect(response.statusCode).toBe(201)
    })
    test('should return 409 single blog fetched',async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const fake = new mongoose.Types.ObjectId();
        const response = await request(app)
        .get(`/api/blog/blog/${fake}`)
        .set('cookie',cookie)
        expect(response.statusCode).toBe(409)
    })
    test ('should return 201 get blogs on profile ',async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .get(`/api/blog/blogsonprofile/${testblog._id}`)
        .set('cookie',cookie)
        console.log(response.body)
        expect(response.statusCode).toBe(201)
    })
})

describe('Delete blog',()=>{
    test('should return 403 different user', async ()=>{
        const loginuser = await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = loginuser.headers['set-cookie']
        const response = await request(app)
        .delete(`/api/blog/blogdelete/${testblog._id}`)
        .set('cookie',cookie)
        expect(response.statusCode).toBe(403)
    })
    test('should return 201 blog dlt',async ()=>{
        const loginuser = await request(app)
        .post('/api/auth/login')
        .send({
            username:'testuser',
            password:'P@assword123'
        })
        const cookie = loginuser.headers['set-cookie']
        const response = await request(app)
        .delete(`/api/blog/blogdelete/${testblog._id}`)
        .set('cookie',cookie)
        expect(response.statusCode).toBe(201)
    })
})

describe('update blog',()=>{
    test('should return 403 not authorized',async ()=>{
        const loginuser = await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = loginuser.headers['set-cookie']
        const response = await request(app)
        .put(`/api/blog/updateblog/${testblog1._id}`)
        .set('cookie',cookie)
        .send({
            title:'changed title of test blog 1'
        })
        console.log(response.body);
        console.log(response.text);
        expect(response.statusCode).toBe(403)
    })

    test('should return 200 authorized',async ()=>{
        const loginuser = await request(app)
        .post('/api/auth/login')
        .send({
            username:'testuser',
            password:'P@assword123'
        })
        const cookie = loginuser.headers['set-cookie']
        const response = await request(app)
        .put(`/api/blog/updateblog/${testblog1._id}`)
        .set('cookie',cookie)
        .send({
            title:'changed title of test blog 1 with the auth user'
        })
        console.log(response.body);
        console.log(response.text);
        expect(response.statusCode).toBe(200)
    })
})

describe('blog searching',()=>{
    test('should return 200 get blog by category', async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .get('/api/blog/blog/category/Tech')
        .set('cookie',cookie)
        expect(response.statusCode).toBe(200)
    })
    

    test('should return 404 get blog by category', async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .get('/api/blog/blog/category/Travel')
        .set('cookie',cookie)
        expect(response.statusCode).toBe(404)
    })
    
})

describe('blog liking',()=>{
    test('should return 201 blog liked',async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .post(`/api/blog/blog/like/${testblog1._id}`)
        .set('cookie',cookie)
        expect(response.statusCode).toBe(201)
    })

    test('should return 201 get blog likes',async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .get(`/api/blog/blog/bloglike/${testblog1._id}`)
        .set('cookie',cookie)
        expect(response.statusCode).toBe(201)
    })

    test('should return 201 blog like removed',async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .post(`/api/blog/blog/like/${testblog1._id}`)
        .set('cookie',cookie)
        expect(response.statusCode).toBe(201)
    })
})

describe('comment',()=>{
    test('should return 201 comment created', async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .post(`/api/blog/blog/comment/${testblog1._id}`)
        .set('cookie',cookie)
        .send({
            content:'Hello this is my first testing comment'
        })
        expect(response.statusCode).toBe(201)
    })

    test('should return 200 comment created', async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .get(`/api/blog/blog/allcomment/${testblog1._id}`)
        .set('cookie',cookie)
        expect(response.statusCode).toBe(200)
    })


    test('should return 200 comment deleted by blog author', async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'testuser',
            password:'P@assword123'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .delete(`/api/blog/blog/comment/dlt/${testcomment1._id}`)
        .set('cookie',cookie)
        expect(response.statusCode).toBe(200)
    })

    test('should return 403 comment deleted by comment owner ', async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'Akaash',
            password:'Aditya@12'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .delete(`/api/blog/blog/comment/dlt/${testcomment2._id}`)
        .set('cookie',cookie)
        expect(response.statusCode).toBe(403)
    })

    test('should return 200 comment deleted by comment owner ', async ()=>{
        const userlogin= await request(app)
        .post('/api/auth/login')
        .send({
            username:'testuser1',
            password:'P@assword123'
        })
        const cookie = userlogin.headers['set-cookie']
        const response = await request(app)
        .delete(`/api/blog/blog/comment/dlt/${testcomment2._id}`)
        .set('cookie',cookie)
        expect(response.statusCode).toBe(200)
    })
})

describe('bookmark', () => {
    test('should add bookmark', async () => {
        const login = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'Akaash',
                password: 'Aditya@12'
            });
        const cookie = login.headers['set-cookie'];
        const response = await request(app)
            .put(`/api/blog/blog/bookmark/${testblog1._id}`)
            .set('cookie', cookie);
        expect(response.statusCode).toBe(200);
    });

        test('should remove bookmark', async () => {
        const login = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'Akaash',
                password: 'Aditya@12'
            });
        const cookie = login.headers['set-cookie'];
        const response = await request(app)
            .put(`/api/blog/blog/bookmark/${testblog1._id}`)
            .set('cookie', cookie);
        expect(response.statusCode).toBe(200);
    });
});

describe('get bookmarks', () => {
    test('should fetch bookmarks', async () => {
        const login = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'Akaash',
                password: 'Aditya@12'
            });
        const cookie = login.headers['set-cookie'];
        const response = await request(app)
            .get(`/api/blog/blog/allbookmark/${testblog1._id}`)
            .set('cookie', cookie);
        expect(response.statusCode).toBe(200);
    });
});

describe('search blog', () => {
    test('should search blog by title', async () => {
        const login = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'Akaash',
                password: 'Aditya@12'
            })
        const cookie = login.headers['set-cookie'];
        const response = await request(app)
            .get('/api/blog/blog/search/search')
            .query({
                query: 'test'
            })
            .set('cookie', cookie);
        expect(response.statusCode).toBe(200);
    });
        test('should return 400 when query missing', async () => {
        const login = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'Akaash',
                password: 'Aditya@12'
            });
        const cookie = login.headers['set-cookie'];
        const response = await request(app)
            .get('/api/blog/blog/search/search')
            .set('cookie', cookie);
        expect(response.statusCode).toBe(400);
    });
});

describe('latest blogs', () => {
    test('should fetch latest blogs', async () => {
        const login = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'Akaash',
                password: 'Aditya@12'
            });
        const cookie = login.headers['set-cookie'];
        const response = await request(app)
        .get('/api/blog/blog/latestblog')
        .set('cookie', cookie);
        expect(response.statusCode).toBe(200);
    });
});

describe('trending blogs',()=>{
    test('should return 200 trending blogs fetched sucessfully', async ()=>{
        const login = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'Akaash',
                password: 'Aditya@12'
            });
        const cookie = login.headers['set-cookie'];
        const response = await request(app)
        .get('/api/blog/blogs/trendingblogs')
        .set('cookie', cookie);
        expect(response.statusCode).toBe(200)
    })
})