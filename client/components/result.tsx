import React, { FormEvent, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { ShortyType } from "../@types";
import { Card } from "../components";

enum ResultComponentStatus {
  INIT = "init",
  COPIED = "copied",
  TOUCHED = "touched",
}

export const Result: React.FC<ShortyType> = (props) => {
  const { original_url, short_link } = props;
  const [status, setStatus] = useState<ResultComponentStatus>(
    ResultComponentStatus.INIT
  );

  useEffect(() => {
    if (status === ResultComponentStatus.COPIED) {
      var t = setTimeout(() => {
        setStatus(ResultComponentStatus.TOUCHED);
      }, 3000);
    }

    // Not sure if this is needed.
    return () => clearTimeout(t);
  }, [status]);

  return (
    <Card>
      <div className="text-lg">
        <span className="inline-block">{original_url}</span>{" "}
        <svg
          className="inline-block mx-1 md:mx-6"
          width="24"
          height="24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
        </svg>
        <CopyToClipboard
          text={short_link}
          onCopy={() => setStatus(ResultComponentStatus.COPIED)}
        >
          <span className="inline-block">
            {short_link}{" "}
            {status !== ResultComponentStatus.COPIED && (
              <svg
                className="inline-block mx-2 animate-bounce"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M17.391 3l2.609 2.808v7.736c0 4.106-6 2.456-6 2.456s1.518 6-2.638 6h-7.362v-16.192l2.666-2.808h-4.666v21h20v-21h-4.609zm2.609 19h-3.824c1.377-1.103 2.751-2.51 3.824-3.865v3.865zm-14.297-15h12.651l-3.312-3.569v-.41c.001-1.668-1.352-3.021-3.021-3.021-1.667 0-3.021 1.332-3.021 3l.001.431-3.298 3.569zm6.297-5c.553 0 1 .448 1 1s-.447 1-1 1-1-.448-1-1 .447-1 1-1z" />
              </svg>
            )}
            {status === ResultComponentStatus.COPIED && (
              <svg
                className="inline-block mx-2"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M22 2v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-13 9.729l.855-.791c1 .484 1.635.852 2.76 1.654 2.113-2.399 3.511-3.616 6.106-5.231l.279.64c-2.141 1.869-3.709 3.949-5.967 7.999-1.393-1.64-2.322-2.686-4.033-4.271z" />
              </svg>
            )}
          </span>
        </CopyToClipboard>
      </div>
    </Card>
  );
};
