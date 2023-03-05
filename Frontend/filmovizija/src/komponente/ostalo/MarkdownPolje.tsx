import { Field, useFormikContext } from "formik";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "./MarkdownPolje.css";

export default function MarkdownPolje(props: markdownPoljeProps) {
  const objekat = useFormikContext<any>();
  return (
    <div className="mb-3 form-markdown">
      <div className="row">
        <div className="col-sm-6">
          <label>{props.prikaz}</label>
          <div>
            <Field
              name={props.nazivPolja}
              as="textarea"
              className="form-textarea"
            />
          </div>
        </div>
        <div className="col-sm-6">
          <label>{props.prikaz} (Pregled)</label>
          <div className="markdown-container">
            <ReactMarkdown>{objekat.values[props.nazivPolja]}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

interface markdownPoljeProps {
  prikaz: string;
  nazivPolja: string;
}
