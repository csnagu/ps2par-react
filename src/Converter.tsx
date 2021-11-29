import React from "react";
import { deconv } from "./decoder";

interface ConverterState {
  raw: string;
  decode: string;
}

export default class Converter extends React.Component<{}, ConverterState> {
  constructor(props: any) {
    super(props);
    this.state = { raw: "", decode: "" };
  }

  handleCahnge = (event: React.ChangeEvent) => {
    this.setState({ raw: (event.target as HTMLInputElement).value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    this.setState({ decode: deconv(this.state.raw) });
    event.preventDefault();
  };

  convert = (raw_text: string): string => {
    return raw_text + "test";
  };

  render() {
    return (
      <form className="Converter-form" onSubmit={this.handleSubmit}>
        <div className="Converter-container">
          <label className="Converter-label" htmlFor="raw_area">
            Raw
          </label>
          <label className="Converter-label" htmlFor="decode_area">
            Decode
          </label>
          <textarea
            id="raw_area"
            className="Converter-codespace"
            value={this.state.raw}
            onChange={this.handleCahnge}
          />
          <textarea
            id="decode_area"
            className="Converter-codespace"
            value={this.state.decode}
            readOnly
          />
        </div>
        <button
          className="Converter-button"
          type="button"
          onClick={() => {
            this.setState({
              raw: "",
              decode: "",
            });
          }}
        >
          Reset
        </button>
        <input className="Converter-button" type="submit" value="Decode" />
        <button
          className="Converter-button"
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(this.state.decode);
          }}
        >
          Copy
        </button>{" "}
      </form>
    );
  }
}
