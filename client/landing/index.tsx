import axios from "axios";
import React, { useState } from "react";
import { ShortyType } from "../@types";
import { Card, Input, Button } from "../components";
import { Result } from "./result";

export const LandingPage = () => {
  const [url, setUrl] = useState("");
  const [linkList, setLinkList] = useState<ShortyType[]>([]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data } = await axios.post("/links", {
      url,
    });

    const link: ShortyType = data.data;

    setLinkList([...linkList, link]);

    setUrl("");
  };

  return (
    <div className="flex flex-col items-center mx-6">
      <Card>
        <h1 className="text-2xl">SmolURL</h1>
        <p>The worlds best url shortner!</p>
        <form className="flex flex-col" onSubmit={handleFormSubmit}>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            type="url"
          />
          <Button className="mt-2 self-end" label="Make It Smol" />
        </form>
      </Card>

      {linkList.map((link) => (
        <Result key={link.hash} {...link} />
      ))}
    </div>
  );
};
