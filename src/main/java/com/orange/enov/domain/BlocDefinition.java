package com.orange.enov.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A BlocDefinition.
 */
@Entity
@Table(name = "bloc_definition")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class BlocDefinition implements Serializable {

    private static final long serialVersionUID = 1L;

    @NotNull
    @Id
    @Column(name = "id", nullable = false)
    private String id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "label", nullable = false)
    private String label;

    @JsonIgnoreProperties(value = { "blocDefinition" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Element element;

    @ManyToOne
    @JsonIgnoreProperties(value = { "blocDefinitions", "parcoursDefinition" }, allowSetters = true)
    private EtapeDefinition etapeDefinition;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public BlocDefinition id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public BlocDefinition name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLabel() {
        return this.label;
    }

    public BlocDefinition label(String label) {
        this.setLabel(label);
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Element getElement() {
        return this.element;
    }

    public void setElement(Element element) {
        this.element = element;
    }

    public BlocDefinition element(Element element) {
        this.setElement(element);
        return this;
    }

    public EtapeDefinition getEtapeDefinition() {
        return this.etapeDefinition;
    }

    public void setEtapeDefinition(EtapeDefinition etapeDefinition) {
        this.etapeDefinition = etapeDefinition;
    }

    public BlocDefinition etapeDefinition(EtapeDefinition etapeDefinition) {
        this.setEtapeDefinition(etapeDefinition);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof BlocDefinition)) {
            return false;
        }
        return id != null && id.equals(((BlocDefinition) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BlocDefinition{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", label='" + getLabel() + "'" +
            "}";
    }
}
