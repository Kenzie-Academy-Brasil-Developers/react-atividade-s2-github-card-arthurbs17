import { Grid, Button, TextField, Card, Paper } from "@material-ui/core";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Cards from "../Cards";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  form: {
    maxWidth: "700px",
    marginTop: "30px",
  },
  error: {
    color: "#8b0000",
  },
  list: {
    maxWidth: "700px",
  },
}));

const Form = () => {
  const classes = useStyles();
  const schema = yup.object().shape({
    repo: yup.string().required("Campo Obrigatório"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const [error, setError] = useState(false);
  const [filterRepo, setFilterRepo] = useState([]);
  const [showList, setShowList] = useState(false);
  const searchSubmit = (data) => {
    console.log(data);
    fetch(`https://api.github.com/repos/${data.repo}`).then((response) =>
      response.json().then((response) => {
        if (response.message === "Not Found") {
          setError(true);
          return response.message;
        }
        const verify = filterRepo.find(
          (repo) => repo.full_name === response.full_name
        );
        if (verify === undefined) {
          setError(false);
          return setFilterRepo([...filterRepo, response]);
        }
      })
    );
    setShowList(true);
  };
  console.log(errors);
  return (
    <Grid
      container
      justifyContent="center"
      spacing={3}
      className={classes.root}
    >
      <Grid item xs={7} className={classes.form} align="center">
        <Paper elevation={3}>
          <form onSubmit={handleSubmit(searchSubmit)}>
            <TextField {...register("repo")} required />
            <Button type="submit" variant="outlined" size="small">
              Enviar
            </Button>
          </form>
          {error && <p className={classes.error}>Repositório inexistente</p>}
        </Paper>
      </Grid>
      <Grid item xs={7} className={classes.list}>
        <Paper elevation={3}>{showList && <Cards list={filterRepo} />}</Paper>
      </Grid>
    </Grid>
  );
};

export default Form;
