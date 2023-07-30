'use client'
import React,{useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';



function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
import {useRouter} from 'next/navigation';

import { signIn } from 'next-auth/react';
import CarregandoBtn from '@/app/components/carregandoBtn';
import { loginApi } from '@/api/usuariosApi';

export default function Login() {
  const [dadosDoUsuario, setDadosDoUsuario] = React.useState<any>()
  const [carregando, setCarregando] = React.useState(false)
  const [error, setError] = React.useState(false)

  const router = useRouter();
  const handleSubmit =async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCarregando(true)
    const data = new FormData(event.currentTarget);
    let email = data.get('email')?.toString() || ''
    let senha = data.get('password')?.toString() || ''
    const loginRes = await loginApi(email as string,senha as string)
    if (!loginRes.token) {
      setCarregando(false)
      return setError(true)
    }
    const s = signIn("credentials",{
      username:email,
      password:senha,
      callbackUrl:"/",
      redirect:true,
    })
  };  
  
  return (
    <div>
        <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Entrar
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    error={error}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    error={error}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                 {
                  error && <Typography color='red'>Login ou senha inválidos</Typography>
                 }
                {
                  carregando ? 
                    <div>
                      <Button
                         fullWidth
                         variant="contained"
                         sx={{ mt: 3, mb: 2 }}
                      >
                        <CarregandoBtn/>
                      </Button>
                    </div>:
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                      Entrar
                    </Button>
                }
                <Grid container>
                    <Grid item xs>
                    <Link href="/" variant="body2">
                        Esqueceu sua senha?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="/cadastro" variant="body2">
                        {"Não tem conta? Cadastre-se aqui"}
                    </Link>
                    </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
                </Box>
            </Box>
            </Grid>
        </Grid>
        </ThemeProvider>

    </div>
  );
}