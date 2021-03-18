import * as React from 'react';

import { Card } from 'react-bootstrap';
import { 
  Button, 
  Menu, 
  MenuButton, 
  MenuItem, 
  MenuList, 
  Switch,
  Text
} from '@chakra-ui/react';

import { BsBoxArrowDown, BsBoxArrowUp } from 'react-icons/bs'

import styles from '../styles/components/Cascade.module.css';
import eproJson from '../epro.json';
import { CascadeContext } from '../contexts/CascadeContext';

const eproJsonOptions = eproJson;

interface PropertiesMenuListProps {
  update: () => void;
}

// Root component -> Manages all app state
export class Cascade extends React.Component {

  state = {
    selectedOptions: {},
  }

  render() {
    return (
      <div className={styles.orgTreeContainer}>
        <Menu closeOnSelect={false}>
          <MenuButton as={Button}>
            Propriedades
          </MenuButton>
          <PropertiesMenuList update={() => {this.forceUpdate()}} />
        </Menu>

        <div className={styles.orgTree}>
          <OptionsList 
            options={eproJsonOptions} 
            onChange={(selectedOptions) => this.setState({selectedOptions})}
            selectedOptions={this.state.selectedOptions} 
          />
        </div>
      </div>
      
    )
  }
  
}

// Recursive component
const OptionsList = ({ options, selectedOptions, onChange }) => {
 
  const handleCheckboxClicked = (selectedOptionId) => {
    // is currently selected
    if(selectedOptions[selectedOptionId]){
      // remove selected key from options list
      delete selectedOptions[selectedOptionId]; 
    } else { // is not currently selected
      // Add selected key to optionsList
      selectedOptions[selectedOptionId] = {} 
    }
    // call onChange function given by parent
    onChange(selectedOptions) 
  }
  
  const handleSubOptionsListChange = (optionId, subSelections) => {
    // add sub selections to current optionId
    selectedOptions[optionId] = subSelections;
    // call onChange function given by parent
    onChange(selectedOptions);
  }

  const getJustInfosFrom = (option) => {
    // Remove a passagem de todas as sob-opções que existirem em determinado node
    // para passar apenas informações do node
    let {subOptions, ...infos} = option;
    
    // Criação de nova informação
    infos['hasChildren'] = (subOptions.length > 0);
    
    return infos;
  }
  
  return (
    <ul>
      {options.map(option => (
        <>
          <li key={option.id}>
            <CardNode 
              selected={selectedOptions[option.id]} 
              infos={ getJustInfosFrom(option) } 
              onChange={() => {handleCheckboxClicked(option.id)}}
            />
            {/* Base Case */}
            {(option.subOptions.length > 0 && selectedOptions[option.id]) &&
              <OptionsList
                options={option.subOptions}
                selectedOptions={selectedOptions[option.id]} 
                onChange={(subSelections) => handleSubOptionsListChange(option.id, subSelections)}
              />
            }
          </li>
        </>
      ))}
    </ul>
  )
}

// Dumb checkbox component, completly controlled by parent
const CardNode = ({ selected, infos, onChange }) => {
  const { displayingProperties, eproPropertiesInfo } = React.useContext(CascadeContext);

  return (
    <div className={styles.node}>
      <Card bg="light" className={styles.card}>
      <Card.Img variant="top" src={infos.img} className={styles.cardImg} />
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>{infos.name}</Card.Title>
          
          <table className={styles.cardTable}>
            {Object.keys(eproPropertiesInfo).map((propretyId) => (
              <>
                {displayingProperties[propretyId] && (
                  <tr>
                    <td>{eproPropertiesInfo[propretyId]['title']}</td>
                    <td>{infos[propretyId]}</td>
                  </tr>
                )}
              </>
            ))}
          </table>

          { infos.hasChildren && (
            <div className={styles.cardCheckboxContainer}>
              <Button 
                color="teal"
                variant="ghost"
                width="100%"
                onClick={() => {
                  onChange(!selected);
                }}
              >{ selected ? <BsBoxArrowUp size="1.5rem" color="red" /> : <BsBoxArrowDown size="1.5rem" color="green" /> }</Button>
            </div>
          ) }
          
        </Card.Body>
      </Card>
    </div>
  )
}

const PropertiesMenuList = ({update}: PropertiesMenuListProps) => {
  const { toggleDisplayingProperties, eproPropertiesInfo } = React.useContext(CascadeContext);
  return (
    <>
      <MenuList>
        { Object.keys(eproPropertiesInfo).map((propretyId) => {
          return(
            <>
              <MenuItem className={styles.menuItem}>
                <Text>{eproPropertiesInfo[propretyId]['title']}</Text>
                <Switch 
                  id={propretyId}
                  defaultIsChecked
                  onChange={() => {
                    toggleDisplayingProperties(`${propretyId}`);
                    update();
                  }}
                />
              </MenuItem>
            </>
          )
        })}
      </MenuList>
    </>
  );
}