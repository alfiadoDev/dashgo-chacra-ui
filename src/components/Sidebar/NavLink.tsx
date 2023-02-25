import { Icon, Link as ChakraLink, LinkProps, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import Link from 'next/link';

interface NavLinkProps extends LinkProps {
  icon: ElementType;
  title: string;
  href: string;
}

export function NavLink({ icon, title, href, ...rest }: NavLinkProps) {
  return (
    <Link href={href} passHref>
      <ChakraLink display="flex" alignItems="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{title}</Text>
      </ChakraLink>
    </Link>
  );
}
