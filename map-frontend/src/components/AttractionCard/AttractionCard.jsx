import React, { useState, useEffect } from "react";
import styles from "./AttractionCard.module.css";
import {Row, Col, Container, Form, Button, Image, Tab, ListGroup} from 'react-bootstrap';
import Rating from 'react-rating';
import star_empty from "../../assets/star-empty.png";
import star_full from "../../assets/star-full.png";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {history} from '../../utils/history';
import {fetchMarkerComments, addComment} from '../../actions/comments';
import {toast} from 'react-toastify'

const AttractionCard = (props) => {
  let [isDescr, setIsDescr] = useState(true);
  let {markerId} = useParams();
  let marker = props.markers.find(mrkr => mrkr.id===markerId);
  
  return (
      <Container className={styles.card} style={{"--color":marker.color.trim(), padding:"0px"}}>
        <div className={styles.cardHeader}>
            <h2 style={{color: '#646262', marginTop:"15px", marginLeft:"20px", fontSize:"35px"}}>{marker.title}</h2>
            <button className={`${styles.closeButton} ${styles.cardButton}`} onClick = {() => history.push("/map")}>
              <a className={styles.close}></a>
            </button>
        </div>
        <div className={styles.auth_header}>
          <div className={styles.auth_header_button} style={isDescr ? {backgroundColor:"rgb(240, 238, 238)"}: null} onClick={()=>setIsDescr(true)}>
            Описание
          </div>
          <div className={styles.auth_header_button} style={!isDescr ? {backgroundColor:"rgb(240, 238, 238)"}:null} onClick={()=>setIsDescr(false)}>
            Отзывы
          </div>
        </div>
        {isDescr ? (
          <DescriptionTab marker={marker}/>
        ):(
          <RatingTabContainer marker={marker}/>
        )}
      </Container>
  )
}

const DescriptionTab = props => {
  
  return(
    <Row style={{overflow:"hidden"}}>
        <Col md={4} style={{overflowY:'scroll', position:"absolute", top:"135px", bottom:"10px", left:"0"}}>
          {props.marker.images.map((image, i) => (
            <Image fluid rounded src={image} style={{marginTop:"10px", cursor:"pointer"}}/>
          ))}
          </Col>
        <Col md={8} style={{overflowY:'scroll', position:"absolute", top:"135px", bottom:"10px", right:"0"}}>
          {props.marker.description.split("\n").map((par, i) => (
            <p key={i}>{par}</p>
          ))}
        </Col>
      </Row>
  )
}

const RatingTab = props => {

  const [userReview, setUserReview] = useState({
    rating: 5,
    comment: ""
  })

  useEffect(() => {
    props.fetchMarkerComments(props.marker.id);
  }, [])

  const sendComment = () => {
    userReview.marker_id = props.marker.id;
    userReview.user_id = props.user.id;
    props.addComment(userReview);
  }

   

  if(props.error){
    toast.error(props.error.toString());
    return null;
  }

  if(props.pending){
    return (
      <h2 style={{color:'grey'}}>Loading...</h2>
    )
  }
  console.log(props.comments);
  const rating = props.comments.reduce((acc, cur) => acc+cur.grade, 0);
  
  return(
    <Container style={{overflow:"scroll"}}>
          <Row style={{marginBottom:"30px", marginLeft:"5px", marginTop:"10px"}}>
              <h6 style={{fontSize:"27px", marginRight:"30px"}}>Рейтинг:</h6>
              {!rating ? (<h6 style={{fontSize:"24px", marginLeft:"30px"}}>Нет оценок</h6>):(<Rating initialRating={rating} readonly
                emptySymbol={<img src={star_empty} className="icon" />}
                fullSymbol={<img src={star_full} className="icon" />}
            />)}
          </Row>
          { props.user && props.comments.every(comm => props.user.id!==comm.user_id) && (
            <React.Fragment>
              <h6 style={{fontSize:"27px", marginRight:"30px"}}>Оставить отзыв:</h6>
              <p style={{fontSize:"1rem", marginBottom:"0px", fontWeight:"400", color:"#212529"}}>Ваша оценка:</p>
              <Rating initialRating={userReview.rating}
                emptySymbol={<img src={star_empty} className="icon" />}
                fullSymbol={<img src={star_full} className="icon" />}
                onChange={(rating)=> setUserReview({...userReview, rating})}
              />
              <Form>
                  <Row style={{marginBottom:"10px", marginTop:"5px"}}>
                  <Col>
                    <Form.Label>Коментарий (необязательно):</Form.Label>
                    <Form.Control as="textarea" rows="3" value={userReview.comment} onChange={(e)=> setUserReview({...userReview, comment:e.target.value})}/>
                </Col>
                  </Row>
                    <Button variant="success" onClick={sendComment}>Оставить отзыв</Button>

              </Form>
            </React.Fragment>)}
            {props.comments.map((comment, i) => {
              let date = new Date(comment.com_date);
              console.log(date);
              
              return(
              <Row key={i}>
                <Col md={2}>
                  <Image style={{marginTop: "30px", padding:"0px 18px"}} fluid rounded src={comment.photo}/>
                </Col>
                <Col md={10}>
                  <Row style={{marginTop: "30px"}}>
                    <b>{comment.name.trim()}</b>
                  </Row>
                  <Row style={{marginTop: "10px"}}>
                    <p>{comment.comment_text}</p>
                  </Row>
                  <Row>
                    <b>Дата: {date.getDay()}/{date.getMonth()}/{date.getFullYear()}</b>
                  </Row>
                </Col>
              </Row>
            )})}
      </Container>
  )
}

const mapStateToProps = store => ({
  comments: store.commentsReducer.comments,
  pending: store.commentsReducer.pending,
  error: store.commentsReducer.error,
  user: store.usersReducer.user,
})

const mapDispatchToProps = dispatch => ({
  fetchMarkerComments: (id) => dispatch(fetchMarkerComments(id)),
  addComment: (comment) => dispatch(addComment(comment))
})

const RatingTabContainer = connect(mapStateToProps, mapDispatchToProps)(RatingTab);

export default AttractionCard;