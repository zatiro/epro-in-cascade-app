import styles from '../styles/components/Sidebar.module.css';
import 'react-pro-sidebar/dist/css/styles.css';
import { Menu, MenuItem, ProSidebar, SidebarContent, SidebarFooter, SidebarHeader, SubMenu } from 'react-pro-sidebar'
import { FaTachometerAlt, FaGem, FaList, FaGithub, FaRegLaughWink, FaHeart } from 'react-icons/fa';

import { HiMenu } from 'react-icons/hi';
import { AiOutlineFileSearch, AiOutlineBarChart } from 'react-icons/ai';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Tag, TagLabel } from '@chakra-ui/tag';

export function Sidebar({collapsed, toggled, handleCollapsedChange, handleToogleSidebar}) {
  return(
    <div className={styles.sidebarContainer}>
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        onToggle={handleToogleSidebar}
        breakPoint="md"
      >
        <SidebarHeader >
          <div className={styles.sidebarHeader}>
            { collapsed ? (
                <Button
                  variant="ghost"
                  colorScheme="blackAlpha.50"
                  _focus={{
                    borderWidth: "0px"
                  }}
                  onClick={handleCollapsedChange}

                ><HiMenu size="2rem" /></Button>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    colorScheme="blackAlpha.50"
                    _focus={{
                      borderWidth: "0px"
                    }}
                    onClick={handleCollapsedChange}
                    className={styles.topRightButton}
                  ><HiMenu size="2rem" /></Button>
                  <Image
                    borderRadius="full"
                    boxSize="130px"
                    src="https://github.com/zatiro.png"
                    alt="Tiago Cardoso"
                  />
                  <strong>Tiago Cardoso</strong>
                </>
              ) }
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="round">

            <SubMenu title='Indicadores' icon={<AiOutlineBarChart size="1.4rem" />}>
              <MenuItem>Painel de OEs </MenuItem>
              <SubMenu title={`Certificação`}>
                  <MenuItem>Civil </MenuItem>
                  <MenuItem>Militar </MenuItem>
                  <MenuItem>Requisitos </MenuItem>
                </SubMenu>
              <SubMenu title={`Produção`}>
                <MenuItem>Estoque </MenuItem>
                <MenuItem>Qualidade </MenuItem>
                <SubMenu title={`Estoque`}>
                  <MenuItem>Itens opcionais </MenuItem>
                  <MenuItem>Itens pendentes </MenuItem>
                  <MenuItem>Itens excedentes </MenuItem>
                </SubMenu>
              </SubMenu>
            </SubMenu>

            <SubMenu
              suffix={<Tag 
                size="sm" 
                colorScheme="red" 
                borderRadius="full"
                variant="outline" 
              >4</Tag>}
              title='Auditorias'
              icon={<AiOutlineFileSearch size="1.4rem" />}
            >
              <MenuItem 
                suffix={<Tag 
                  size="sm" 
                  colorScheme="red" 
                  borderRadius="full"
                  variant="outline" 
                >3</Tag>}
              >Buracos na Epro</MenuItem>
              <MenuItem>Aprovações pendentes</MenuItem>
              <MenuItem
                suffix={<Tag 
                  size="sm" 
                  colorScheme="yellow" 
                  borderRadius="full"
                  variant="outline" 
                >1</Tag>}
              >PNs não certificados</MenuItem>
            </SubMenu>

          </Menu>
        </SidebarContent>

        <SidebarFooter>
          <div className={styles.sidebarFooter}>
            <a href="https://github.com/zatiro" target="_blank">
              <Tag 
                size="lg" 
                colorScheme="blue" 
                borderRadius="full"
                variant="outline"
              >
                <FaGithub />
                {!collapsed && (
                  <TagLabel marginLeft={2}>View more from TAC</TagLabel>
                )}
              </Tag>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </div>
  );
}