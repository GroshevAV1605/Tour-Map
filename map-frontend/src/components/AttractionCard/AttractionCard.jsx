import React, { useState, useEffect } from "react";
import styles from "./AttractionCard.module.css";
import {Row, Col, Container, Form, Button, Image, Tab, ListGroup} from 'react-bootstrap';
import Rating from 'react-rating';
import star_empty from "../../assets/star-empty.png";
import star_full from "../../assets/star-full.png";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import {history} from '../../utils/history';

const AttractionCard = (props) => {
  let [isDescr, setIsDescr] = useState(true);
  let {markerId} = useParams();
  let marker = props.markers.find(mrkr => mrkr.id===markerId);
  console.log(props.markers);
  
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
          <RatingTab marker={marker}/>
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
          <Image fluid rounded src='https://bipbap.ru/wp-content/uploads/2017/10/0_8eb56_842bba74_XL-640x400.jpg' style={{marginTop:"10px", cursor:"pointer"}}/>
          <Image fluid rounded src='https://bipbap.ru/wp-content/uploads/2017/10/0_8eb56_842bba74_XL-640x400.jpg' style={{marginTop:"10px", cursor:"pointer"}}/>
          <Image fluid rounded src='https://bipbap.ru/wp-content/uploads/2017/10/0_8eb56_842bba74_XL-640x400.jpg' style={{marginTop:"10px", cursor:"pointer"}}/>
          <Image fluid rounded src='https://bipbap.ru/wp-content/uploads/2017/10/0_8eb56_842bba74_XL-640x400.jpg' style={{marginTop:"10px", cursor:"pointer"}}/>
        </Col>
        <Col md={8} style={{overflowY:'scroll', position:"absolute", top:"135px", bottom:"10px", right:"0"}}>
          {props.marker.description.split("\\n").map((par, i) => (
            <p key={i}>{par}</p>
          ))}
        </Col>
      </Row>
  )
}

const RatingTab = props => {
  return(
    <p>RatingTab</p>
  )
}

export default AttractionCard;

/*const AttractionCard = ({marker, changeMarker}) => {
  const [media, mediaChange] = useState({type:"", url:""});
  console.log(marker);
  
  return(
    <div className={styles.card} style={{"--color":marker.color}}>
      <div className = {styles.cardHeader}>
        {media.url ? (
          <button className={`${styles.backButton} ${styles.cardButton}`} onClick={() => mediaChange({ type: "", url: "" })} className={styles.leftArrow}><i></i>Назад</button>
        ):(
        <h2>{marker.title}</h2>
        )}
        <button className={`${styles.closeButton} ${styles.cardButton}`} onClick = {() => changeMarker({marker:"", showCard:false})}>
          <a className={styles.close}></a>
        </button>
      </div>
      <CardContent
        media={media}
        marker={marker}
        mediaChange={mediaChange}
      />
    </div>
  )
}

const CardContent = ({media, marker, mediaChange}) => {
  return media.url ? (
    <div className={styles.mediaContainer}>
      <img src={media.url}></img>
    </div>
  ):(
    <div className={styles.CardContent}>
      <div className={styles.mediaMenu}>
        {marker.images.map((img, i) => (
          <div className={styles.imageContainer}
            onClick={() => mediaChange({type:"img", url:img})} key={i}>
              <img className={styles.imgPrevew} src={img}/>
            </div>
        ))}
      </div>
      <div className={styles.description}>
          {marker.description.split("\\n").map((par, i) => (
            <p key={i}>{par}</p>
          ))}
      </div>
    </div>
  )
}/*

/*const AttractionCard = ({marker, changeMarker}) => {
  const [media, mediaChange] = useState({type:"", url:""});

  return (
    <div className={styles.card} style={{ "--color": "#01d4cd" }}>
      <div className={styles.cardHeader}>
        
        <h2>Оренбургский областной музей изобразительных искусств</h2>
        <button
          className={`${styles.closeButton} ${styles.cardButton}`}
        >
          <a className={styles.close}></a>
        </button>
      </div>
      <Container style={{overflow:"hidden"}}>
          <Row style={{marginBottom:"30px"}}>
              <h6 style={{fontSize:"27px", marginRight:"30px"}}>Рейтинг:</h6>
              <Rating initialRating={4.35}
                emptySymbol={<img src={star_empty} className="icon" />}
                fullSymbol={<img src={star_full} className="icon" />}
            />
          </Row>
          <Row style={{marginBottom:"30px"}}>
              <h6 style={{fontSize:"27px", marginRight:"30px"}}>Ваша оценка:</h6>
              <Rating initialRating={4.35}
                emptySymbol={<img src={star_empty} className="icon" />}
                fullSymbol={<img src={star_full} className="icon" />}
            />
          </Row>
          <Row style={{marginBottom:"30px"}}>
            <h6 style={{fontSize:"27px", marginRight:"30px"}}>Отзывы:</h6>
          </Row>
          <Form>
              <Row style={{marginBottom:"10px"}}>
              <Col>
                <Form.Label>Оставить коментарий:</Form.Label>
                <Form.Control as="textarea" rows="3"/>
            </Col>
              </Row>
                <Button variant="success">Оставить коментарий</Button>
            
          </Form>
          <Row>
              <Col md={2}>
                <Image style={{marginTop: "30px", padding:"0px 18px"}} fluid rounded src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"/>

              </Col>
              <Col md={10}>
                <Row style={{marginTop: "30px"}}>
                    <b>Test testov 2</b>
                </Row>
                <Row style={{marginTop: "10px"}}>
                    <p>Посещение музея изобразительных искусств, это отрыв от нашей действительности  от башенного ритма нашей жизни. Время там остановилось, вы можете побродить в тишине и спокойствие и насладиться прекрасными произведениями.</p>
                </Row>
                <Row>
                    <b>Дата: 6/05/2020</b>
                </Row>
              </Col>
          </Row>
          <Row>
              <Col md={2}>
                <Image style={{marginTop: "30px", padding:"0px 18px"}} fluid rounded src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/unknown-512.png"/>

              </Col>
              <Col md={10}>
                <Row style={{marginTop: "30px"}}>
                    <b>Test testov 123</b>
                </Row>
                <Row style={{marginTop: "10px"}}>
                    <p>Неживое место. Скука и тишина. Такое ощущение, что время застыло в Оренбурге. Зато здание музея выглядит отлично. Желаю чтобы Оренбург был также уходен.</p>
                </Row>
                <Row>
                    <b>Дата: 6/05/2020</b>
                </Row>
              </Col>
          </Row>

      </Container>
    </div>
  );
};

const CardContent = () => {

  let description = "Оренбургский областной музей изобразительных искусств основан в 1960 году, открыт в 1961 году. Музей находится в здании, построенном в начале XIX века по проекту архитектора Михайло Малахова для Городской Думы.\\nОсновой коллекции музея стало собрание произведений академика живописи, одного из интереснейших представителей позднего передвижничества Лукиана Васильевича Попова (1873—1914), работавшего в Оренбурге в конце XIX – начале XX века.\\nВ собрании музея хранятся произведения древнерусского, русского, советского и западноевропейского искусства, начиная с конца XVI века до наших дней, в том числе живопись, графика, скульптура, декоративно-прикладное искусство.\\nРусское искусство XIX века представлено различными жанрами, в основном, пейзажем. Среди работ произведения И. К. Айвазовского, Л. Ф. Лагорио, А. К. Саврасова, Н. Н. Дубовского, В. Е. Маковского, В. Д. Поленова, Ф. А. Малявина и других.";
  return (
    <div className={styles.cardContent}>
      <div className={styles.mediaMenu}>
          <div
            className={styles.imageContainer}
          >
            <img
              className={styles.imgPrevew}
              src={`https://img.youtube.com/vi/NZVTAVz44xE/0.jpg`}
            />
            <img
              height="50px"
              width="50px"
              className={styles.playIcon}
              src="https://image.flaticon.com/icons/png/512/0/375.png"
            ></img>
          </div>
          <div
            className={styles.imageContainer}
          >
            <img className={styles.imgPrevew} src="https://b1.culture.ru/c/340878.jpg" />
          </div>
          <div
            className={styles.imageContainer}
          >
            <img className={styles.imgPrevew} src="http://omizo.ru/assets/galleries/750/9.jpg" />
          </div>
          <div
            className={styles.imageContainer}
          >
            <img className={styles.imgPrevew} src="http://omizo.ru/assets/galleries/611/18.jpg" />
          </div>
      </div>
      <div className={styles.description}>
          <Row style={{marginBottom:"15px"}}>
              <Col md={{span:1, offset:8}}>
                <a style={{fontSize:"20px", color:"#65bd6b", textDecoration:"underline", marginTop:"15px", lineHeight:"40px"}} href="#">Отзывы</a>
              </Col>
              <Col md={3}>
              <Rating initialRating={4.35}
                                                    emptySymbol={<img src={star_empty} className="icon" />}
                                                    fullSymbol={<img src={star_full} className="icon" />}
                                                />
              </Col>
          </Row>
        {description.split("\\n").map((par, i) => (
          <p key={i}>{par}</p>
        ))}
      </div>
    </div>
  );
};*/