import axios from "axios";
import { link } from "fs";
import React, { FormEvent, useState } from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      className=" w-full px-4 py-2 border border-gray-700 rounded "
      {...props}
    />
  );
};

interface ButtonProps {
  label: string;
}

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
> = (props) => {
  const { className } = props;

  return (
    <button
      {...props}
      className={`px-4 py-2 border border-gray-700 rounded ${className}`}
    >
      {props.label}
    </button>
  );
};

/**
 * created_at: "2021-01-16T12:09:11.672Z"
deleted_at: null
hash: "BavwZ6wzth"
hits: 0
id: "c9da2fcc-7f15-492e-ad36-c066d5a51d98"
original_url: "https://github.com/germangamboa95/smolurl"
short_link: "http://localhost:5555/BavwZ6wzth"
updated_at: "2021-01-16T12:09:11.672Z"
webhook: null
webhook_meta: n
 */

interface ShortyType {
  hash: string;
  original_url: string;
  short_link: string;
}

export const MainComponent = () => {
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
    <div className="mt-6 p-6 w-3/6 bg-white rounded text-center shadow-2xl">
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
    </div>
  );
};
