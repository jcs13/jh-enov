import { IBlocDefinition } from 'app/entities/bloc-definition/bloc-definition.model';
import { IParcoursDefinition } from 'app/entities/parcours-definition/parcours-definition.model';

export interface IEtapeDefinition {
  id?: string;
  name?: string;
  label?: string;
  blocDefinitions?: IBlocDefinition[] | null;
  parcoursDefinition?: IParcoursDefinition | null;
}

export class EtapeDefinition implements IEtapeDefinition {
  constructor(
    public id?: string,
    public name?: string,
    public label?: string,
    public blocDefinitions?: IBlocDefinition[] | null,
    public parcoursDefinition?: IParcoursDefinition | null
  ) {}
}

export function getEtapeDefinitionIdentifier(etapeDefinition: IEtapeDefinition): string | undefined {
  return etapeDefinition.id;
}
