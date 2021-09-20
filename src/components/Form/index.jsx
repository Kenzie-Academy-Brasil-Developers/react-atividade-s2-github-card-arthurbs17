import { Grid, Button, TextField } from "@material-ui/core";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import Cards from "../Cards";

const Form = () => {
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
  const searchSubmit = (data) => {
    fetch(`https://api.github.com/repos/${data.repo}`).then((response) =>
      response.json().then((response) => {
        if (response.message === "Not Found") {
          setError(true);
        } else {
          setFilterRepo([...filterRepo, response]);
        }
      })
    );
  };

  console.log(filterRepo);
  return (
    <Grid container>
      <Grid>
        <form onSubmit={handleSubmit(searchSubmit)}>
          <TextField {...register("repo")} />
          <Button type="submit">Enviar</Button>
          {errors.repo?.message && <span>{errors.repo.message}</span>}
        </form>
        {error && <p>Repositório inexistente</p>}
      </Grid>
      <Grid>
        <Cards list={filterRepo} />
      </Grid>
    </Grid>
  );
};

export default Form;
