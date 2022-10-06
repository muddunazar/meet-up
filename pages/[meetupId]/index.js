import { useRouter } from "next/router";
import { Fragment } from "react";
import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";

//  /
function MeetupDetails(props) {
  // const router = useRouter();
  // const id = router.query.meetupId;
  return (
    <MeetupDetail
      // image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
      // title="A first Meetup"
      // address=">Some Street 5, Some City"
      // description="The meetup description."
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://mudduleo:123@cluster0.gjrqdsl.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    // fallback: false,
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // paths: [
    //   {
    //     params: { meetupId: "m1" },
    //   },
    //   {
    //     params: { meetupId: "m2" },
    //   },
    // ],
  };
}

export const getStaticProps = async (context) => {
  //fetch data for single meetup
  //as useRouter can't be used here.
  const meetupId = context.params.meetupId;
  // console.log(meetupId);
  const client = await MongoClient.connect(
    "mongodb+srv://mudduleo:123@cluster0.gjrqdsl.mongodb.net/?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");
  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });
  console.log(selectedMeetup);
  client.close();
  return {
    props: {
      // meetupData: selectedMeetup,

      meetupData: {
        id: selectedMeetup._id.toString(), //else obj(xyz),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },

      // meetupData: {
      //   image:
      //     "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
      //   // id: "m1",
      //   id: meetupId,
      //   title: "A first Meetup",
      //   address: "Some Street 5, Some City",
      //   description: "The meetup description.",
      // },
    },
    // revalidate: 1,
  };
};
export default MeetupDetails;
