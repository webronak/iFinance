import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { UploadBtn, TagsContainer, TagsHead } from "./styles";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import InfoIcon from "@mui/icons-material/Info";
import { DashboardFormProps } from "./types";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useUpdateIncome } from "query";
import Chip from "@mui/material/Chip";

const DashboardForm: React.FC<DashboardFormProps> = ({
  editFieldId,
  title,
  handleChange,
  handleUpload,
  data,
  isLoading,
  tags,
  handleTagClick,
}) => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <TextField
            id="outlined-basic"
            label="Title"
            onChange={handleChange}
            value={data["title"]}
            name="title"
            margin="normal"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="outlined-multiline-static"
            label="Description"
            margin="normal"
            name="description"
            variant="outlined"
            value={data["description"]}
            multiline
            onChange={handleChange}
            fullWidth
            rows={5}
          />
          <TextField
            id="outlined-adornment-amount"
            label="Amount"
            margin="normal"
            variant="outlined"
            value={data["amount"] || ""}
            onChange={handleChange}
            name="amount"
            fullWidth
          />

          <TagsContainer>
            <TagsHead>
              Select one tag
              <Tooltip
                title="Select a tag that describes the type of your transaction"
                placement="right"
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </TagsHead>
            <Stack direction="row" spacing={1}>
              {tags.map((tagName, index) => {
                return data.tag === tagName ? (
                  <Chip key={tagName + index} label={tagName} color="primary" />
                ) : (
                  <Chip
                    label={tagName}
                    key={tagName + index}
                    variant="outlined"
                    color="primary"
                    onClick={() => handleTagClick(tagName)}
                  />
                );
              })}
              {/* <Chip label="Chip Filled" color="primary" />
              <Chip label="Chip Outlined" variant="outlined" color="primary" /> */}
            </Stack>
          </TagsContainer>

          <UploadBtn
            variant="contained"
            endIcon={<SendIcon />}
            onClick={handleUpload}
            loading={isLoading}
            loadingPosition="end"
          >
            Upload
          </UploadBtn>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardForm;
