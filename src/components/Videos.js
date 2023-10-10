import React, { useContext, useState, useRef } from "react";
import { UserContext } from "../App.js";
import ReactPlayer from "react-player/lazy";
import like_Unlike from "../assets/images/like_Unlike.js";
import { TooltipComp } from "../assets/styles/react-bootstrap.js";
import "../assets/styles/Videos.css";
import { fetchPostHook } from "../assets/hooks/fetchPostHook.js";


export default function Videos({ stemVideo, index, scrollToNextPlayer }) {
  const { user, dispatch, ACTIONS } = useContext(UserContext);
  const { isLoggedIn, user_id } = user;
  const { Overlay, Popover } = TooltipComp;
  const [liked, setLiked] = useState(false);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const [videoWasViewed, setVideoWasViewed] = useState(false);
  const [duration, setDuration] = useState(0);
  const playerRefs = useRef([]);

  const overlayRef = useRef([]);

  const handleLike = (event) => {
    const newLikedState = !liked;
    if (!isLoggedIn) {
      setShow(!show);
      setTarget(event.target);
      setTimeout(() => {
        setShow(false);
      }, 5000);
      return;
    } else {
      setLiked(newLikedState);
      setShow(!show);
      setTarget(event.target);
      setTimeout(() => {
        setShow(false);
      }, 3000);
      fetchPostHook(ACTIONS, dispatch, "/userAccount/favorites", {
        user_id: user_id,
        video_id: stemVideo.video_id,
        liked: newLikedState,
      });
    }
  };
  const addToViewed = (video_id, index) => {
    setVideoWasViewed(true);
    fetchPostHook(ACTIONS, dispatch, "/userAccount/addViewed", {
      user_id,
      video_id,
    });
    scrollToNextPlayer(index, 1)
  };
  const handleProgress = (progress) => {
    if (isLoggedIn){
      if (progress.played >= 0.05 && !videoWasViewed) {
        addToViewed(stemVideo.video_id, index);
        playerRefs.current.seekTo(duration);
        
        scrollToNextPlayer(index, 1)
      }
    }
  };
  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  console.log("from videos/videoWasViewed:", videoWasViewed);
  
  return (
    <>
      <div className="row align-items-center video-header" >
        <h3 className="col title">{stemVideo.title}</h3>
      </div>

      <div className="col-12 player-wrapper">
        <ReactPlayer
          className="react-player"
          url={`https://www.youtube.com/watch?v=${stemVideo.video_id}`}
          width="100%"
          height="100%"
          volume={0.5}
          ref={playerRefs}
          controls
          onProgress={handleProgress}
          onDuration={handleDuration}
          //onEnded={() => addToViewed(stemVideo.video_id, index)}
        />
      </div>
      <div className="row align-items-center video-footer">
        <div className="col-2 btn like-container" style={{ cursor: "pointer" }}>
          <div className="like-container" onClick={handleLike} ref={overlayRef}>
            {like_Unlike(liked)}
          </div>
          <Overlay
            target={target}
            show={show}
            placement="top"
            container={overlayRef}
            containerPadding={20}
          >
            {isLoggedIn ? (
              <Popover id="popover-contained">
                {liked ? (
                  <Popover.Body>Added to your favorites!</Popover.Body>
                ) : (
                  <Popover.Body>Removed from your favorites!</Popover.Body>
                )}
              </Popover>
            ) : (
              <Popover id="popover-contained">
                <Popover.Body>Please login to add to favorites</Popover.Body>
              </Popover>
            )}
          </Overlay>
        </div>

        <div className="col">
          {stemVideo.description && (
            <button className="btn" onClick={toggleDescription}>
              Description
            </button>
          )}
        </div>
        <div className="col-2">
          <p>
            Field:
            {stemVideo.stem_field.charAt(0).toUpperCase() +
              stemVideo.stem_field.slice(1)}
          </p>
        </div>
        {stemVideo.description && (
          <div className="row video-description g-2" hidden={isExpanded}>
            <p>{stemVideo.description}</p>
          </div>
        )}
      </div>
    </>
  );
}
