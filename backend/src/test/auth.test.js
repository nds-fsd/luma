const supertest = require("supertest");
const { bootstrapApp } = require("../bootstrap");
const app = bootstrapApp();
const fakeRequest = supertest(app);
const User = require("../mongoose")
const { generateJWT } = require('../services/auth.service');
const { disconnectDB, connectDB } = require("../mongoose");


beforeAll(async () => {
    await connectDB()
})

afterAll((done) => {
    disconnectDB().then(() => {
        console.log("Disconnected from test database!");
        done();
    });
});

let adminUser;
let adminHeaders;

it('ADMIN user exists', async () => {
    adminUser = await User.findOne({ role: 'ADMIN' });
    expect(adminUser).toBeDefined();
    expect(adminUser.email).toBe('admin@fakeluma.com');
    adminHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + generateJWT(adminUser)
    }
    console.log("ADMIN CREADO", adminUser);
})

// describe('POST /user', () => {
//     it('ADMIN can create new USER', async () => {
//         const res = await fakeRequest.post('/user').set(adminHeaders).send({
//             name: 'Jose Manuel',
//             email: 'jcano@nuclio.com',
//             password: 'nuclio',
//         });
//         expect(res.status).toBe(201);
//         expect(res.body.name).toBe('Jose Manuel');
//         expect(res.body.role).toBe('USER');
//         expect(res.body.password).not.toBe('nuclio');
//         normalUser = res.body;
//         normalUserHeaders = {
//             'Content-Type': 'application/json',
//             'Authorization': 'Bearer ' + generateJWT(normalUser)
//         }
//     });

//     it('USER can not create new USER', async () => {
//         const res = await fakeRequest.post('/user').set(normalUserHeaders).send({
//             name: 'Jose Manuel',
//             email: 'jcano2@nuclio.com',
//             password: 'nuclio',
//         });
//         expect(res.status).toBe(403);
//     });
// });


    describe("POST /user/register", () => {
        it("ADMIN can create new USER", async () => {
            const response = await (await fakeRequest.post("/user/register")).set(adminHeaders).send({
                fullname: 'ADMIN',
                email: 'admin@fakeluma.com',
                birthdate: "1991-10-12",
                phone_number: "600000000",
                role: "ADMIN",
                profile_picture: "www.google.com",
                password: 'passworddd',
            });
            expect(response.status).toBe(201);
            expect(response.body.user._id).toBeDefined();
            expect(response.body.user.fullname).toBe('ADMIN');
            expect(response.body.user.email).toBe('admin@fakeluma.com');
            expect(response.body.user.birthdate).toBe('1991-10-12');
            expect(response.body.user.phone_number).toBe('600000000');
            expect(response.body.user.profile_picture).toBe('www.google.com');
            expect(response.body.user.password).not.toBe('pasworddd');
            expect(response.body.token).toBeDefined();
        });

        it("should not let the user register if the email already exists", async () => {
            const response = await fakeRequest.post("/register").send(userData);
            expect(response.status).toBe(401);
        });

    }
    )

    it("should let the user login", async () => {
        const response = await fakeRequest.post("/login").send(userData);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });
    
    it("should not let the user login if the email is not registered", async () => {
        const response = await fakeRequest.post("/login").send({ email: "not@email.com", password: "password" });
        expect(response.status).toBe(401); 
    });
    
    it("should not let the user login if the password does not match", async () => {
        const response = await fakeRequest.post("/login").send({ ...userData, password: "not a password" });
        expect(response.status).toBe(401); 
        expect(response.body.error).toBe('Invalid password!');
    });    

