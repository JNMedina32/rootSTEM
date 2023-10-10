import React, { useContext, useEffect, useState, useRef } from "react";
import "../assets/styles/Home.css";
import { UserContext } from "../App.js";
import fetchGetFromDB from "../assets/hooks/fetchGetFromDB";
import Videos from "../components/Videos.js";
import QuestionsModal from "../components/QuestionsModal";

export default function Home({ searchedVideos }) {
  const { user, dispatch, ACTIONS } = useContext(UserContext);
  const { learner } = user;
  const [stemVideos, setStemVideos] = useState([]);
  const playerRefs = useRef([]);
 

  console.log("from home/searchedVideos:", searchedVideos);
  console.log("from home/learner:", learner);
  // console.log(playerRefs.current)

  //---------API CALL FOR ALL VIDEOS
  useEffect(() => {
    if(searchedVideos.length > 0) {
      setStemVideos(searchedVideos);
      return;
    };
    //-------Updates state with videos from DB based on user preferences
    if (learner) {
      fetchGetFromDB(
        ACTIONS,
        dispatch,
        `/home?learner=${learner}`,
        setStemVideos
      );
    } else {
      fetchGetFromDB(ACTIONS, dispatch, `/home`, setStemVideos);
    }
  }, [learner, searchedVideos]);

  const scrollToNextPlayer = (index, dir) => {
    const nextPlayer = playerRefs.current[index + dir];
    if (nextPlayer) {
      nextPlayer.scrollIntoView({ behavior: "smooth" });
    }

  };


  return (
    <div>
      {stemVideos.map((stemVideo, index) => (
        <div
          className="container background-container mb-5"
          key={index}
          ref={(el) => (playerRefs.current[index] = el)}
          // onScroll={() => handleScroll(index)}
        >
          <Videos
            stemVideo={stemVideo}
            index={index}
            scrollToNextPlayer={scrollToNextPlayer}

          />
        </div>
      ))}
      <QuestionsModal />
    </div>
  );
}
