import * as React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Link,
  Card,
} from "@material-ui/core";

const Cards = ({ list }) => {
  return (
    <Card variant="outlined">
      <List>
        {list.map((repo, index) => (
          <ListItem alignItems="flex-start" key={index}>
            <ListItemAvatar>
              <Avatar src={repo.owner.avatar_url} alt={repo.full_name} />
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
      </List>
    </Card>
  );
};

export default Cards;
