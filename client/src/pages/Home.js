import React from 'react';

import { Form, } from 'react-bootstrap'
/*import 'bootstrap/dist/css/bootstrap.min.css';*/
import './Home.css'



const Home = () => {


  return (

    <div className="is-preload">

      {/* Wrapper */}
      <div id="wrapper">

        {/* Main */}
        <div id="main">
          <div className="inner">



            {/* Banner */}
            <section className="main-banner">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <div className="banner-content">
                      <div className="row">
                        <div className="col-md-12">
                          <div className="banner-caption">
                            <h4>Hello, this is our <em>School</em> website.</h4>
                            <span>AWESOME SCHOOL &amp; TEACHERS</span>
                            <p>Our school welcomes students from kindergarten (5 years) to 6 th  grade. It offers a good quality education environment. Our community is very united and involved, the teaching staff are dynamic and engaged. </p>
                            <div className="primary-button">
                              <a href="#">Read More</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Services */}
            <section className="services">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-4">
                    <div className="service-item first-item">
                      <div className="icon"></div>
                      <h4>Our Strategy </h4>
                      <p>Learning isn’t all about sitting at the table with pencil and paper; there’s a lot that kids can learn through play, too.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="service-item second-item">
                      <div className="icon"></div>
                      <h4>The key of success</h4>
                      <p>Our school is the key of success, we support you and guide you in you learning journey </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="service-item third-item">
                      <div className="icon"></div>
                      <h4>Printable resources</h4>
                      <p>with 30,000+ digital and printable resources, kids can learn about any topic they’re curious about.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="service-item fourth-item">
                      <div className="icon"></div>
                      <h4>Explore </h4>
                      <p>Review important concepts and explore new topics </p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="service-item fivth-item">
                      <div className="icon"></div>
                      <h4>Get in touch</h4>
                      <p>You can get the fastest response from <a rel="nofollow" href="https://www.facebook.com/School">School</a> facebook page.</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="service-item sixth-item">
                      <div className="icon"></div>
                      <h4>Spread a word</h4>
                      <p>Please tell your friends about our School and spread a word about the quality of learning . This is very helpful.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Top Image */}
            <section className="top-image">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <img src="./assets/slide4.png" alt="" />
                    <div className="down-content">
                      <h4>Learning by playing </h4>
                      <p>We’ve got educational games galore: Sharpen math skills with Addition Pizza Party,
                        learn letters with Alphabet Cloud Catcher, and transform study time into an adventure every day!
                        Get hands-on with learning! Our expert-designed activities bring hundreds of topics to life through science experiments, engaging writing prompts,
                        creative art projects, and more.
                        Once your child is back at school, they might struggle to get back into the swing of table-top learning, so why not have a look at Make Time 2 Play? It has over 450 play ideas for primary school children and younger that can be played online or downloaded to a tablet or phone. You can search by age, the number of children participating, the duration of the game and the particular benefits.


                      </p>
                      <div className="primary-button">
                        <a href="#">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Left Image */}
            <section className="left-image">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    <img src="./assets/slide1.jpg" alt="" />
                  </div>
                  <div className="col-md-6">
                    <div className="right-content">
                      <h4>funny games to practice </h4>
                      <p>Follow our carefully designed sequence of fun games to practice and perfect 800+ key skills.
                        There’s a great selection of activities including arts and crafts, physical challenges and imaginative play, many of which you can do in the home and garden.
                        <br></br>
                        Our school has multiple resources organized for any learning tool you might need as a teacher, parent, and student </p>
                      <div className="primary-button">
                        <a href="#">Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Right Image */}
            <section className="right-image">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-6">
                    <div className="left-content">
                      <h4>lesson plans make it easy for classroom</h4>
                      <p>Our ready-made lesson plans make it easy for classroom
                        educators and homeschoolers to provide meaningful instruction to students.
                        <br></br>
                        What does your student want to learn? We’ve got a worksheet for that! Our printables are
                        a fun and easy way to learn about multiplication, sight words, animal life cycles, and much more! </p>
                      <div className="primary-button">
                        <a href="#">Read More</a>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <img src="assets/slide3.jpg" alt="" />
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>



      </div>
    </div>

  )
}

export default Home
