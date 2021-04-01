import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet-async";

const StyledDiv = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  color: grey;
  padding: 4px;
  background: white;
`;

const GET_LINKS = gql`
  {
    links: getLinks {
      _id
      title
      url
    }
  }
`;

const Info = () => {
  const { loading, error, data } = useQuery(GET_LINKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ⁉️</p>;

  return (
    <>
      <Helmet>
        <title>Info Page</title>
        <meta name="description" content="Info Page Description" />
      </Helmet>
      <StyledDiv>
        <h2>Learn Meteor!</h2>
        <ul>
          {data?.links?.map((link) => (
            <li key={link._id}>
              <a href={link.url} target="_blank">
                {link.title}
              </a>
              <br />
              <Link to={`/link/${link._id}`}>LinkPage</Link>
            </li>
          ))}
        </ul>
      </StyledDiv>
    </>
  );
};

export default Info;
