import React, { useState, useEffect } from 'react'
import qs from 'query-string'

import { yupResolver } from '@hookform/resolvers/yup'
import { validatePhone, validateEmail } from 'validations-br'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'

import { useHistory } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom'
import { toast } from 'react-toastify'
import usePlans from '../../hooks/usePlans'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'

import { i18n } from '../../translate/i18n'

import Paper from '@material-ui/core/Paper'
import { AvatarGroup } from '@material-ui/lab'

import { openApi } from '../../services/api'
import toastError from '../../errors/toastError'
import moment from 'moment'
import { styled } from '@material-ui/styles'
import InputMask from 'react-input-mask'

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
  name: yup
    .string()
    .min(5, 'Nome informado é muito curto!')
    .max(
      50,
      'Nome informado é muito longo é permitido o máximo de 50 caracteres'
    )
    .required('Por gentileza, informe seu name.'),
  phone: yup
    .string()
    .test('is-phone', 'Por gentileza, informe um número válido.', value =>
      validatePhone(value)
    )
    .required('Por gentileza, informe um número de telefone válido.'),
  email: yup
    .string()
    .test('is-email', 'Por gentileza, informe um e-mail válido', value =>
      validateEmail(value)
    )
    .email('Por gentileza, informe um e-mail válido')
    .required('Por gentileza, informe um e-mail'),
  password: yup
    .string()
    .required('Por favor, digite sua senha.')
    .min(8, 'A senha é muito curta - deve ter no mínimo 8 caracteres.'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'As senhas devem corresponder'),
  acceptTermsConditions: yup
    .boolean()
    .oneOf([true], 'Os termos e condições devem ser aceitos')
})

const defaultValues = {
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirm: '',
  acceptTermsConditions: false,
  recurrence: 'MENSAL',
  dueDate: moment().add(3, 'day').format(),
  campaignsEnabled: false,
  status: 't',
  planId: '1'
}

const SignUp = () => {
  const history = useHistory()
  let companyId = null

  const params = qs.parse(window.location.search)
  if (params.companyId !== undefined) {
    companyId = params.companyId
  }

  const initialState = {
    name: '',
    email: '',
    phone: '',
    password: '',
    recurrence: 'MENSAL',
    dueDate: moment().add(3, 'day').format(),
    campaignsEnabled: false,
    status: 't',
    planId: '1'
  }

  const [plans, setPlans] = useState([])
  const { list: listPlans } = usePlans()

  const { control, formState, handleSubmit, setError, setValue, reset } =
    useForm({
      mode: 'onChange',
      defaultValues,
      resolver: yupResolver(schema)
    })
  const { isValid, dirtyFields, errors } = formState

  async function onSubmit(values) {
    try {
      await openApi.post('/companies/cadastro', values)
      toast.success(i18n.t('signup.toasts.success'))
      reset(defaultValues)
      history.push('/login')
    } catch (err) {
      console.log(err)
      reset(defaultValues)
      toastError(err)
    }
  }

  useEffect(() => {
    async function fetchData() {
      const list = await listPlans()
      setPlans(list)
    }
    fetchData()
  }, [])

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
                <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
                  <div className="items-center mb-48">
                    <center>
                      <img
                        className="w-120"
                        src="assets/images/logo/logo.svg"
                        alt="logo"
                      />
                    </center>
                  </div>
                  <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
                    Criar uma acesso
                  </Typography>
                  <div className="flex items-baseline mt-2 font-medium">
                    <Typography>Já tem uma conta?</Typography>
                    <Link className="ml-4" component={RouterLink} to="/login">
                      Fazer login
                    </Link>
                  </div>
                  <form
                    name="registerForm"
                    noValidate
                    className="mt-32 flex w-full flex-col justify-center"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Controller
                      name="name"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-24"
                          label="Name"
                          autoFocus
                          type="name"
                          error={!!errors.name}
                          helperText={errors?.name?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-24"
                          label="Email"
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
                      name="phone"
                      control={control}
                      render={({ field }) => (
                        <InputMask
                          className="mt-0"
                          mask="(99) 99999-9999"
                          maskChar={null}
                          {...field}
                        >
                          {field => (
                            <TextField
                              {...field}
                              id="phone"
                              name="phone"
                              label="Telefone com (DDD)"
                              margin="normal"
                              type="tel"
                              error={!!errors.phone}
                              helperText={errors?.phone?.message}
                              className="mb-24 mt-0"
                              variant="outlined"
                              autoComplete="phone"
                              fullWidth
                              required
                            />
                          )}
                        </InputMask>
                      )}
                    />
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-24"
                          label="Password"
                          type="password"
                          error={!!errors.password}
                          helperText={errors?.password?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="passwordConfirm"
                      control={control}
                      render={({ field }) => (
                        <TextField
                          {...field}
                          className="mb-24"
                          label="Password (Confirm)"
                          type="password"
                          error={!!errors.passwordConfirm}
                          helperText={errors?.passwordConfirm?.message}
                          variant="outlined"
                          required
                          fullWidth
                        />
                      )}
                    />

                    <Controller
                      name="acceptTermsConditions"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          className="items-center"
                          error={!!errors.acceptTermsConditions}
                        >
                          <FormControlLabel
                            label="I agree to the Terms of Service and Privacy Policy"
                            control={<Checkbox size="small" {...field} />}
                          />
                          <FormHelperText>
                            {errors?.acceptTermsConditions?.message}
                          </FormHelperText>
                        </FormControl>
                      )}
                    />

                    <Button
                      variant="contained"
                      color="secondary"
                      className=" mt-24 w-full"
                      aria-label="Register"
                      disabled={!isValid}
                      type="submit"
                      size="large"
                    >
                      {i18n.t('signup.buttons.submit')}
                    </Button>
                  </form>
                </div>
              </Paper>
              <Box
                className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
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
                          borderColor: 'textSecondary'
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

export default SignUp
