import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { HpoService } from "../../../shared/services/external/hpo.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import { HpoTerm, MaxoSearchResult, MaxoTerm } from "../../../shared/models/search-models";
import { AnnotationSource, Publication } from "../../../shared/models/models";
import { CurationService } from "../../../shared/services/curation/curation.service";
import { StateService } from "../../../shared/services/state/state.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogSourceComponent } from "../dialog-source/dialog-source.component";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-treatment-curation',
  templateUrl: './treatment-curation.component.html',
  styleUrls: ['./treatment-curation.component.scss']
})
export class TreatmentCurationComponent implements OnInit {


  @Input('selectedSource') annotationSource: AnnotationSource;
  @Output('onAnnotationSuccess') onAnnotationSuccess: EventEmitter<boolean> = new EventEmitter<boolean>();

  selectedAnnotation: any;
  lockForm: boolean = false;

  selectedTreatment: MaxoTerm;
  selectedHpo: HpoTerm;
  maxoOptions: MaxoSearchResult[];
  hpoOptions: HpoTerm[];
  selectedPublications: Publication[] = [];

  savingAnnotation: boolean = false;
  formControlGroup: FormGroup = new FormGroup({
    maxoFormControl: new FormControl('', Validators.required),
    hpoFormControl: new FormControl('', Validators.required),
    evidenceFormControl: new FormControl('', Validators.required),
    relationFormControl: new FormControl('', Validators.required),
    extensionFormControl: new FormControl(''),
    commentFormControl: new FormControl('')
  });

  constructor(public hpoService: HpoService,
              public curationService: CurationService,
              public stateService: StateService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.stateService.selectedAnnotationSource.subscribe(source => {
      if(source?.publication){
        this.selectedPublications = [source.publication];
      }
    });

    this.stateService.selectedTreatmentAnnotation.subscribe((annotation) => {
      if(!annotation){
        this.selectedPublications = [];
        this.resetMaxoForm();
      } else {
        this.selectedAnnotation = annotation;
        this.setFormValues(annotation);
      }
    });

    this.stateService.selectedAnnotationMode.subscribe((mode) => {
      if(mode != 'edit'){
        this.lockForm = true;
        this.formControlGroup.disable();
      } else {
        this.lockForm = false;
        this.formControlGroup.enable();
      }
    });

    this.formControlGroup.get("maxoFormControl").valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(query => {
        if (query && query.length >= 3 && !this.lockForm) {
          this.hpoService.searchMaxoTerms(query).subscribe((data) => {
            if (!data) {
              this.formControlGroup.get("maxoFormControl").setErrors({notFound: true});
            }
            this.maxoOptions = data;
          }, (err) => {
            this.formControlGroup.get("maxoFormControl").setErrors({notFound: true});
          });
        }
      });

    this.formControlGroup.get("hpoFormControl").valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe(query => {
        if (query && query.length > 3 && !this.lockForm) {
          this.hpoService.searchHPOTerms(query).subscribe((data) => {
            if (!data) {
              this.formControlGroup.get("hpoFormControl").setErrors({notFound: true});
            }
            this.hpoOptions = data;
          }, (err) => {
            this.formControlGroup.get("hpoFormControl").setErrors({notFound: true});
          });
        }
      });
  }

  submitForm(): void {
    const maxoAnnotation = {
      maxoId: this.formControlGroup.get('maxoFormControl').value.ontologyId.toString(),
      maxoName: this.formControlGroup.get('maxoFormControl').value.name,
      hpoId: this.formControlGroup.get('hpoFormControl').value.id,
      hpoName: this.formControlGroup.get('hpoFormControl').value.name,
      evidence: this.formControlGroup.get('evidenceFormControl').value,
      relation: this.formControlGroup.get('relationFormControl').value,
      comment: this.formControlGroup.get('commentFormControl').value,
    }
    this.savingAnnotation = true;
    this.curationService.saveMaxoAnnotation(maxoAnnotation).subscribe(()=>{
      this.onSuccessfulMaxoSave()
    }, (err) => {
      this.onErrorMaxoSave();
    });
  }

  setFormValues(annotation: any){
    this.formControlGroup.get('maxoFormControl').setValue({ontologyId: annotation.maxoId, name: annotation.maxoName});
    this.formControlGroup.get('hpoFormControl').setValue({id: annotation.hpoId, name: annotation.hpoName});
    this.formControlGroup.get('evidenceFormControl').setValue(annotation.evidenceType);
    this.formControlGroup.get('relationFormControl').setValue(annotation.relation);
    this.formControlGroup.get('extensionFormControl').setValue(annotation.extension);
    this.formControlGroup.get('commentFormControl').setValue(annotation.comment);
    this.selectedPublications = [annotation.annotationSource.publication];

  }

  onSuccessfulMaxoSave(){
    this.savingAnnotation = false;
    this.stateService.triggerAnnotationReload(true);
    this.resetMaxoForm();
    this._snackBar.open('Annotation Saved!', 'Close', {
      duration: 5000,
    });
  }
  onErrorMaxoSave(){
    this.savingAnnotation = false;
    this.resetMaxoForm();
    this._snackBar.open('Error Saving Annotation!', 'Close', {
      duration: 5000,
    });
  }
  selectPublication(){
   this.dialog.open(DialogSourceComponent, {
      minWidth: 300,
   });
  }

  everythingValid(){
    return this.formControlGroup.valid && this.selectedPublications.length > 0 && !this.lockForm;
  }

  resetMaxoForm() {
    this.formControlGroup.reset();
  }

  resetMaxoTermSelect() {
    this.formControlGroup.get("maxoFormControl").reset();
  }

  resetHpoTermSelect() {
    this.formControlGroup.get("hpoFormControl").reset();
  }

  displayMaxoFn(option) {
    return option && option.name ? `${option.name} ${option.ontologyId}` : '';
  }

  displayHpoFn(option) {
    return option && option.name ? `${option.name} ${option.id}` : '';
  }

  remove(publication: Publication): void {
    const index = this.selectedPublications.indexOf(publication);

    if (index >= 0) {
      this.selectedPublications.splice(index, 1);
    }
  }
}
