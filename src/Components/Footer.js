import { Link } from "react-router-dom";
import { Row, Col } from "reactstrap";

export default function Footer (){
    return(
        <div className="footer">
            <div className="container">
                <div className="d-none d-md-block ">
                <div className=" justify-content-center row">             
                    <div className="col-3 col-sm-4">
                        <h5>Links</h5>
                        <ul className="list-unstyled ">
                            <li><Link to="/home" className="footer-link">Home</Link></li>
                            <li><Link to="/about" className="footer-link">About</Link></li>
                            <li><Link to="/menu" className="footer-link">Menu</Link></li>
                            <li><Link to="/contact" className="footer-link">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 col-sm-4 ">
                        <h5> Address</h5>
                        <div>
                          121, Clear Water Bay Road<br />
                          Clear Water Bay, Lagos<br />
                          Nigeria<br />
                          <i className="fa fa-phone fa-lg"></i>: +234 809 548 372<br />
                          <i className="fa fa-fax fa-lg"></i>: +234 813 7272 091<br />
                          <i className="fa fa-envelope fa-lg"></i>: <a className="footer-link" href="mailto:confusion@food.net">
                             confusion@food.net</a>
                        </div>
                    </div>
                    <div className="col-3 col-sm-4 text-center">
                    <h5>Socials</h5>
                        <Row className="text-center btn-group mx-auto">
                            <Col>
                                <a className="btn btn-social-icon btn-google border-0 my-2" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                            </Col>
                            <Col>
                                <a className="btn btn-social-icon btn-facebook border-0 my-2" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                            </Col>
                            <Col>
                                <a className="btn btn-social-icon btn-linkedin border-0 my-2" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                            </Col>
                            <Col>
                                <a className="btn btn-social-icon btn-twitter border-0 my-2" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                            </Col>
                            <Col>
                                <a className="btn btn-social-icon btn-google border-0 my-2" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>                        
                            </Col>
                            </Row>
                    </div>
                </div>

                </div>
                
                <div className="row justify-content-center">             
                    <div className="text-center mt-3">
                        <span>made with 🤎 by Akbar Badmus</span> <br/>
                        akbarbadmus ™️ 2022.
                </div>
                </div>
            </div>
        </div>
        )
}