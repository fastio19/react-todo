import React, { useState, useRef } from "react";
import uuid from "react-uuid";
import AddIcon from "@material-ui/icons/Add";
import {
  Container,
  FormControl,
  TextField,
  makeStyles,
} from "@material-ui/core";

import { TodoItem } from "../../types";

export interface AddProps {
  addItem: (item: TodoItem | TodoItem[]) => void;
  changeFocus: (focusIndex: number) => void;
}
// function displayErrorMessage(message: string): void {
//   // implement your logic to display the error message to the user
//   // alert(message);
//   document.getElementById("input-text").innerText = message;
// }
const useStyles = makeStyles({
  root: {
    display: "flex",
    width: "100%",
  },
  plusIcon: {
    margin: "5px 10px 0px 8px",
  },
});

export const Form = (props: AddProps) => {
  const classes = useStyles();
  const { addItem, changeFocus } = props;
  const [itemName, setItemName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Container className={classes.root}>
      <AddIcon className={classes.plusIcon} />
      <FormControl fullWidth>
        <TextField
          id="input-text"
          inputRef={inputRef}
          onPaste={(e) => {
            // Stop data actually being pasted into div
            e.stopPropagation();
            e.preventDefault();

            // Get pasted data via clipboard API
            const clipboardData = e.clipboardData;
            const MAX_CHARACTERS = 12;
            const pastedData = clipboardData
              .getData("Text")
              .split("\n")
              .reverse()
              .filter((name) => name.trim() !== "");
            // if (
            //   pastedData.length > 0 &&
            //   pastedData[0].length > MAX_CHARACTERS
            // ) {
            //   e.target.value = "cannot add more than 10 characters.";
            // } else {
              // Do whatever with pasteddata
              const items = pastedData.map((name) => {
                return { name, uuid: uuid(), isComplete: false };
              });
              addItem(items);
              changeFocus(items.length - 1);
            // }
          }}
          onChange={(e) => {
            addItem({
              name: e.target.value,
              uuid: uuid(),
              isComplete: false,
            });
            changeFocus(0);
            setItemName("");
          }}
          placeholder="Add item."
          value={itemName}
          className="w-10/12"
          autoFocus
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              // Move cursor down to the next item
              const inputs = document.querySelectorAll("input[type='text']");
              const inputsArray = Array.from(inputs);
              const index = inputsArray.indexOf(
                inputRef.current as HTMLInputElement
              );

              // Checks if the focused item is at the bottom
              if (index < inputsArray.length - 1) {
                const nextInputElement = inputsArray[
                  index + 1
                ] as HTMLInputElement;

                nextInputElement.focus();
              }
            }
          }}
        />
      </FormControl>
    </Container>
  );
};
