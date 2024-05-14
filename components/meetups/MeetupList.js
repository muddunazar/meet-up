import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.css";

function MeetupList(props) {
 return (
  <ul className={classes.list}>
   <p
    style={{ color: typeof window == "undefined" ? "red" : "green" }}
    className={`${typeof window == "undefined" ? "trueCodition" : "falseCodition"}`}
   >
    Welcome to sunlighten customers care
    {`${typeof window == "undefined" ? "trueCodition" : "falseCodition"}`}
   </p>
   {props.meetups.map((meetup) => (
    <MeetupItem key={meetup.id} id={meetup.id} image={meetup.image} title={meetup.title} address={meetup.address} />
   ))}
  </ul>
 );
}

export default MeetupList;
