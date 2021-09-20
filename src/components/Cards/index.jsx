import * as React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@material-ui/core";

const Cards = ({ list }) => {
  return (
    <List>
      {list.map((repo, index) => (
        <ListItem alignItems="flex-start" key={index}>
          <ListItemAvatar>
            <Avatar src={repo.organization.avatar_url} alt={repo.full_name} />
          </ListItemAvatar>
          <ListItemText
            primary={repo.full_name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                ></Typography>
                {repo.description}
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Cards;
