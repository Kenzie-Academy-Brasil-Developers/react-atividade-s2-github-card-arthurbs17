import * as React from "react";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Link,
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
            primary={<Link href={repo.html_url}>{repo.full_name}</Link>}
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
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default Cards;
