import { Stack } from "@chakra-ui/react";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink href="/dashboard" icon={RiDashboardLine} title="Dashboard" />
        <NavLink href="/users" icon={RiContactsLine} title="Usuarios" />
      </NavSection>
      <NavSection title="Automacao">
        <NavLink href="/forms" icon={RiInputMethodLine} title="Formularios" />
        <NavLink href="/auto" icon={RiGitMergeLine} title="Automacao" />
      </NavSection>
    </Stack>
  );
}
