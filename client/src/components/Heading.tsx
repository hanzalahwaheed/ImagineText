import React from "react";

const Heading = ({ content }: { content: string }) => {
  return <h1 className="text-2xl font-bold mt-4 mb-4">{content}</h1>;
};

export default Heading;
