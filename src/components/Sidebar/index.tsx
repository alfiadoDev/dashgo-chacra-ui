import { Box, Icon, Link, Stack, Text } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function Sidebar() {
  return (
    <Box as="aside" h="64" mr="8">
      <Stack spacing="12" align="flex-start">
        <NavSection title="Geral">
          <NavLink icon={RiDashboardLine} title="Dashboard" />
          <NavLink icon={RiContactsLine} title="Usuarios" />
        </NavSection>
        <NavSection title="Automacao">
          <NavLink icon={RiInputMethodLine} title="Formularios" />
          <NavLink icon={RiGitMergeLine} title="Automacao" />
        </NavSection>
      </Stack>
    </Box>
  )
}
