import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_LINK = gql`
  query Link($id: ID!) {
    link: getLink(id: $id) {
      _id
      title
      url
    }
  }
`;

const LinkPage = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_LINK, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ⁉️</p>;

  const { link } = data;
  return (
    <div>
      <h2>Learn Meteor!</h2>
      <a href={link.url} target="_blank">
        {link.title}
      </a>
    </div>
  );
};

export default LinkPage;
