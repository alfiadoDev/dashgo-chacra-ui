import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack, } from "@chakra-ui/react";
import Link from "next/link";
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

import { Input } from "../../components/Form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { useMutation } from "react-query";
import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { useRouter } from "next/router";

type CreateFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

const createFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatorio'),
  email: yup.string().required('E-mail Obrigatorio').email('E-mail Invalido'),
  password: yup.string().required('Senha Obrigatorio')
    .min(6, 'A senha deve ter 6 caracteres no minimo'),
  password_confirmation: yup.string().oneOf([
    yup.ref('password'), undefined
  ], 'As senhas precisam ser iguais').required('A confirmacao e obrigatoria')
})

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateFormData) => {
    const response = await api.post('users', {
      user: {
        ...user,
        created_at: new Date()
      }
    })

    return response.data.user;
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })

  const { handleSubmit, register, formState } = useForm<CreateFormData>({
    resolver: yupResolver(createFormSchema)
  })

  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateFormData> = async (data) => {
    await createUser.mutateAsync(data)
    router.push('/users')
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar Usuario</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              w="100%"
            >
              <Input label="Nome completo" error={errors.name} {...register('name')} />
              <Input type="email" error={errors.email} {...register('email')} label="E-mail" />
            </SimpleGrid>

            <SimpleGrid
              minChildWidth="240px"
              spacing={["6", "8"]}
              w="100%"
            >
              <Input type="password" error={errors.password} {...register('password')} label="Senha" />
              <Input error={errors.password_confirmation} {...register('password_confirmation')} type="password" label="Confirmar senha" />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              {/* <Link href="/users" passHref legacyBehavior>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link> */}
              <Button as={Link} href="/users" passHref colorScheme="whiteAlpha">Cancelar</Button>
              <Button type="submit" colorScheme="pink" isLoading={formState.isSubmitting}>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
