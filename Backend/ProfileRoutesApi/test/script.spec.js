const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../server');
chai.should();
chai.use(chaiHttp);
const port = 8000
describe('Profiles API Testing', () => {
    describe("1- Identify user and return response /api/v1/profile", () => {
        it("return response based on user email", (done) => {
            chai.request(`http://localhost:${port}`)
                .get("/api/v1/profile")
                .query({
                    email: "koushik.ssv@gmail.com"
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    const obj = res.body;
                    // console.log(obj)
                    Object.keys(obj.user[0]).length.should.be.eql(9);
                    done();
                });
        })
    })
    describe("2- Identify user and return 400 response /api/v1/profile on non existing user", () => {
        it("return response based on user email", (done) => {
            chai.request(`http://localhost:${port}`)
                .get("/api/v1/profile/jfnjfg@gmail.com")
                // .query({
                //     email: "jfnjfg@gmail.com"
                // })
                .end((err, res) => {
                    // console.log(res.body)
                    // res.should.have.status(200);
                    // res.body.should.be.a('object');

                    // const obj = res.body;
                    // console.log(obj)
                    res.body.status.should.be.eql(400)
                    // Object.keys(obj.user[0]).length.should.be.eql(9);
                    done();
                });
        })
    })
    describe("3- Identify user and get user education deatils from profile /api/v1/profile ", () => {
        it("return response based on user email", (done) => {
            chai.request(`http://localhost:${port}`)
                .get("/api/v1/profile/koushik.ssv@gmail.com")
                .end((err, res) => {
                    res.body.status.should.be.eql(200)
                    const obj = res.body;
                    // console.log(res.body)
                    obj.user.education.should.be.a('array');
                    done();
                });
        })
    })
    describe("4- Add user and return response /api/v1/addprofile", () => {
        it("return response based on adding user data", (done) => {
            let profile = {
                _id: '1ef9be47-b847-4db6-9928-86d01d9c77c5',
                email: 'tony@gmail.com',
                basic: [],
                contact: [],
                education: [],
                works: [],
                skills: 'Python,JS',
                fields: [],
            }
            chai.request(`http://localhost:${port}`)
                .post("/api/v1/addprofile/tony@gmail.com")
                .send(profile)
                .end((err, res) => {
                    res.status.should.be.eql(200)
                    done();
                });
        })
    })
    describe("5- Update user deatils and return response /api/v1/addprofile", () => {
        it("return response based on updating user data", (done) => {
            let profile = {
                _id: '1ef9be47-b847-4db6-9928-86d01d9c77c5',
                email: 'tony@gmail.com',
                basic: ["1234567", "524004"],
                contact: [],
                education: ["Btech", "Intermediate", "SSC"],
                works: [],
                skills: 'Python,JS',
                fields: [],
            }
            chai.request(`http://localhost:${port}`)
                .post("/api/v1/addprofile/tony@gmail.com")
                .send(profile)
                .end((err, res) => {
                    // console.log(res.body)
                    res.body.status.should.be.eql(200)
                    res.body.message.should.be.eql("User Profile Updated");
                    done();
                });
        })
    })


})
