import { Button, Flex, Stack } from "@chakra-ui/react";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from "../components/Form/Input";

type SigninFormData = {
  email: string
  password: string
}

const signinFormSchema = yup.object().shape({
  email: yup.string().required('E-mail Obrigatorio').email('E-mail Invalido'),
  password: yup.string().required('Senha Obrigatorio').min(6, 'A senha deve ter 6 caracteres no minimo')
})

export default function SignIn() {
  const { handleSubmit, register, formState } = useForm<SigninFormData>({
    resolver: yupResolver(signinFormSchema)
  })
  const { errors } = formState

  const handleSignin: SubmitHandler<SigninFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
  }

  return (
    <Flex
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        as="form"
        w="100%"
        maxW={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit(handleSignin)}
      >
        <Stack spacing={4}>
          <Input
            label="E-mail"
            type="email"
            error={errors.email}
            {...register('email')}
          />
          <Input
            label="Senha"
            type="password"
            error={errors.password}
            {...register('password')}
          />
        </Stack>

        <Button
          type="submit"
          mt={6}
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
