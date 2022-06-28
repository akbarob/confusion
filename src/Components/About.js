import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, CardImg, CardSubtitle, CardText, CardTitle, Col, Media, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from "./Loading"
import {motion} from 'framer-motion'
import { baseUrl } from '../shared/baseUrl';


function RenderLeader (props){
    const list = {
        visible: {
          opacity: 1,
          transition: {
            when: "beforeChildren",
            staggerChildren: 0.3,
            staggerDirection: 1
          }
        },
        hidden: {
          opacity: 0,
          transition: {
            when: "afterChildren"
          }
        }
      };
    
      const child= {
        visible: { opacity: 1, x: 0 },
        hidden: { opacity: 0, x: -100 }
      };
    
    const leaders= props.leaders.map(lead => {
        return(
            
            <motion.div key={lead.id} lead={lead.id}
            variants={child}

            >
                <Card className='mb-3'>
                    <Row className='g-0'>
                        <Col sm='2'>
                            <CardImg src={baseUrl + lead.image}/>
                        </Col>
                        <Col sm='8'>
                            <CardBody>
                                <CardTitle>{lead.name}</CardTitle>
                                <CardSubtitle><strong>{lead.abbr}</strong> ({lead.designation})</CardSubtitle>
                                <CardText>{lead.description}</CardText>
                            </CardBody>
                        </Col>
                    </Row>                    
                </Card>
            </motion.div>
        )
    })
    if(props.isLoading){
        return(
            <Loading/>
        )
    }
    else if(props.errMess){
        return(
            <h4>{props.errMess}</h4>
        )
    }
    else
    return(
        <motion.div
        initial="hidden" animate="visible" variants={list}
        >{leaders}</motion.div>
    )
}

export default function About(props) {
  

    return(
        <motion.div className="container"
            initial={{opacity:0, width:0}}
            animate={{opacity:1, width:"100%"}}
            exit={{opacity:0, x:window.innerWidth, transition:{duration:0.3}}}>
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div> 
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our History</h2>
                    <p>Started in 2010, Ristorante con Fusion quickly established itself as a culinary icon par excellence in Hong Kong. With its unique brand of world fusion cuisine that can be found nowhere else, it enjoys patronage from the A-list clientele in Hong Kong.  Featuring four of the best three-star Michelin chefs in the world, you never know what will arrive on your plate the next time you visit us.</p>
                    <p>The restaurant traces its humble beginnings to <em>The Frying Pan</em>, a successful chain started by our CEO, Mr. Peter Pan, that featured for the first time the world's best cuisines in a pan.</p>
                </div>
                <motion.div className="col-12 col-md-5"
                animate={{ x: 50 }}
                transition={{ type: "spring", bounce: 2 }}>
                    <Card>
                        <CardHeader className="bg-primary text-white">Facts At a Glance</CardHeader>
                        <CardBody>
                            <dl className="row p-1">
                                <dt className="col-6">Started</dt>
                                <dd className="col-6">3 Feb. 2013</dd>
                                <dt className="col-6">Major Stake Holder</dt>
                                <dd className="col-6">HK Fine Foods Inc.</dd>
                                <dt className="col-6">Last Year's Turnover</dt>
                                <dd className="col-6">$1,250,375</dd>
                                <dt className="col-6">Employees</dt>
                                <dd className="col-6">40</dd>
                            </dl>
                        </CardBody>
                    </Card>
                </motion.div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">You better cut the pizza in four pieces because
                                    I'm not hungry enough to eat six.</p>
                                <footer className="blockquote-footer">Yogi Berra,
                                <cite title="Source Title">The Wit and Wisdom of Yogi Berra,
                                    P. Pepe, Diversion Books, 2014</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <div className="row row-content">
                <div className="col-12">
                    <h2>Corporate Leadership</h2>
                </div>
                <div className="col-12">
                    <RenderLeader 
                    leaders={props.Leaders.Leaders}
                    isLoading={props.Leaders.isLoading}
                    errMess={props.Leaders.errMess}
                    />
                </div>
            </div>
        </motion.div>
    );
}

     