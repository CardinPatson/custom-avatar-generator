import { Component, Input, OnDestroy } from '@angular/core';
import  Option  from './Option';
import  OptionContext  from './OptionContext';

function getComponentOptionValue(component: any): string {
  const optionValue = component.optionValue;
  if (!optionValue) {
    throw new Error(`optionValue should be provided for ${component}`);
  }
  return optionValue;
}

@Component({
  selector: 'app-selector',
  template: '<ng-content *ngIf="result !== null"></ng-content>',
})
export class SelectorComponent implements OnDestroy {
  private _optionContext: OptionContext;

  result: any = null;

  @Input()
  option: Option;

  @Input()
  defaultOption: any;

  constructor(optionContext: OptionContext) {
    this._optionContext = optionContext;
  }

  ngOnInit() {
    const defaultValue =
      typeof this.defaultOption === 'string'
        ? this.defaultOption
        : getComponentOptionValue(this.defaultOption);
    this._optionContext.addStateChangeListener(() =>
      this.optionContextUpdate()
    );
    this._optionContext.optionEnter(this.option.key);
    const optionState = this._optionContext.getOptionState(this.option.key);
    this.updateOptionValues();
    if (optionState) {
      this._optionContext.setDefaultValue(this.option.key, defaultValue);
    }
  }

  ngOnDestroy() {
    this._optionContext.removeStateChangeListener(() =>
      this.optionContextUpdate()
    );
    this._optionContext.optionExit(this.option.key);
  }

  optionContextUpdate() {
    this.updateOptionValues();
  }

  updateOptionValues() {
    const values = [];
    for (const child of this._optionContext.children.toArray()) {
      values.push(getComponentOptionValue(child.constructor));
    }
    if (new Set(values).size !== values.length) {
      throw new Error('Duplicate values');
    }
    this._optionContext.setOptions(this.option.key, values);
    const value = this._optionContext.getValue(this.option.key);
    this.result = null;
    for (const child of this._optionContext.getImmediateChildren()) {
      if (getComponentOptionValue(child.constructor) === value) {
        this.result = child;
        break;
      }
    }
  }
}
