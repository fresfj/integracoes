import React, { useState, useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'

import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { yupResolver } from '@hookform/resolvers/yup'
import { InferType } from 'yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { i18n } from '../../translate/i18n'

import { AvatarGroup } from '@material-ui/lab'
import { Avatar } from '@material-ui/core'

import { AuthContext } from '../../context/Auth/AuthContext'
import logo from '../../assets/logo.png'
import { styled } from '@material-ui/styles'

const Root = styled('div')(() => ({
  '& .container': {
    maxWidth: `1570px`,
    width: '100%',
    margin: '0 auto'
  }
}))

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email('You must enter a valid email')
    .required('You must enter a email'),
  password: yup
    .string()
    .required('Please enter your password.')
    .min(4, 'Password is too short - must be at least 4 chars.'),
  remember: yup.boolean()
})

const defaultValues = {
  email: '',
  password: '',
  remember: true
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { handleLogin } = useContext(AuthContext)

  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema)
  })
  const { isValid, dirtyFields, errors } = formState

  function onSubmit(user) {
    console.log(user)
    handleLogin(user)
  }

  return (
    <Root id="fuse-layout" className="flex w-full">
      <div className="flex min-w-0 flex-auto">
        <main
          id="fuse-main"
          className="relative z-10 flex min-h-full min-w-0 flex-auto flex-col"
        >
          <div className="relative z-10 flex min-h-0 flex-auto flex-col">
            <div className="flex min-w-0 flex-auto flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
              <Paper className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:p-64 md:shadow-none">
                <div className="mx-auto w-full max-w-320 sm:mx-0 sm:w-320">
                  <div className="items-center mb-48">
                    <center>
                      <img
                        className="w-120"
                        src="assets/images/logo/logo.svg"
                        alt="logo"
                      />
                    </center>
                  </div>
                  <Typography className="mt-32 text-4xl font-extrabold leading-tight tracking-tight">
                    Acesso
                  </Typography>
                  <div className="mt-2 flex items-baseline font-medium">
                    <Typography>Não tem uma conta?</Typography>
                    <Link className="ml-4" component={RouterLink} to="/signup">
                      Criar um acesso.
                    </Link>
                  </div>

                  <form
                    name="loginForm"
                    noValidate
                    className="flex flex-col justify-center w-full mt-32"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-24"
                          label={i18n.t('login.form.email')}
                          autoFocus
                          type="email"
                          error={!!errors.email}
                          helperText={errors?.email?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-24"
                          label={i18n.t('login.form.password')}
                          type="password"
                          error={!!errors.password}
                          helperText={errors?.password?.message}
                          variant="outlined"
                          InputProps={{
                            className: 'pr-2',
                            type: showPassword ? 'text' : 'password',
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => setShowPassword(!showPassword)}
                                  size="large"
                                >
                                  <Icon className="text-20" color="action">
                                    {showPassword
                                      ? 'visibility'
                                      : 'visibility_off'}
                                  </Icon>
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="secondary"
                      disabled={!isValid}
                      className="w-full mt-8"
                      aria-label="Register"
                      size="large"
                    >
                      {i18n.t('login.buttons.submit')}
                    </Button>
                  </form>
                </div>
              </Paper>
              <Box
                className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
                sx={{ bgcolor: 'violet.main' }}
              >
                <svg
                  className="absolute inset-0 pointer-events-none"
                  viewBox="0 0 960 540"
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMax slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Box
                    component="g"
                    sx={{ color: 'primary.light' }}
                    className="opacity-20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="100"
                  >
                    <circle r="234" cx="196" cy="23" />
                    <circle r="234" cx="790" cy="491" />
                  </Box>
                </svg>
                <Box
                  component="svg"
                  className="absolute -top-64 -right-64 opacity-20"
                  sx={{ color: 'primary.light' }}
                  viewBox="0 0 220 192"
                  width="220px"
                  height="192px"
                  fill="none"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="4"
                        height="4"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="220"
                    height="192"
                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                  />
                </Box>

                <div className="z-10 relative w-full max-w-2xl">
                  <div className="text-7xl font-bold leading-none text-gray-100">
                    <div>Atendimento Multicanal</div>
                  </div>
                  <div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
                    Você unifica o atendimento da sua empresa em uma plataforma
                    organizada, fácil de usar e que une todo o seu time em um
                    único número de WhatsApp.
                  </div>
                  <div className="flex items-center mt-32 -space-x-2">
                    <AvatarGroup
                      sx={{
                        '& .MuiAvatar-root': {
                          borderColor: 'primary.main'
                        }
                      }}
                    >
                      <Avatar src="assets/images/avatars/female-18.jpg" />
                      <Avatar src="assets/images/avatars/female-11.jpg" />
                      <Avatar src="assets/images/avatars/male-09.jpg" />
                      <Avatar src="assets/images/avatars/male-16.jpg" />
                    </AvatarGroup>

                    <div className="ml-16 font-medium tracking-tight text-gray-400">
                      Junte-se a mais de 30k empresas que alavancaram suas
                      vendas
                    </div>
                  </div>
                </div>
              </Box>
            </div>
          </div>
        </main>
      </div>
    </Root>
  )
}

export default Login
