import {  Profile, ProfileLink, ProfileSex, Family, FamilyLink, createProfile  } from 'simple-family-tree-model';
import { LocalTreeBackend } from 'simple-family-tree-model';
import { expect } from 'chai';
import { generateLayout, createFamilyLayout } from '../src/index';
import 'mocha';

describe('verify tree', () => {
    let tree = new LocalTreeBackend();

    let profile1 = undefined;
    let profile2 = undefined;
    let family1 = undefined;
    //Arrange
    it('Add first profile to tree ', () => {
        //Arrange
        let newProfile1 = createProfile("Kalle Andersson", ProfileSex.Male, "19010101", "Umeå, Sweden", "19610101", "Vännäs, Sweden");

        let newProfileId1 = tree.addNewProfile(newProfile1);

        let newProfile2 = createProfile("Karin Andersson", ProfileSex.Female, "19020202", "Umeå, Sweden", "19620202", "Vännäs, Sweden");

        expect(newProfile2.profileId.itemLink).to.equal("");


        let newProfileId2 = tree.addNewProfile(newProfile2);

        //Arrange
        let family = new Family();

        let newFamilyId = tree.addNewFamily(family);

        let family1 = tree.findFamily(new FamilyLink("F1"));

        if (family?.familyId != undefined) {

            let result = tree.addParentToFamily(new FamilyLink("F1"), new ProfileLink("P1"));

            let result3 = tree.addParentToFamily(new FamilyLink("F1"), new ProfileLink("P2"));

            let profile2 = tree.findProfile(new ProfileLink("P2"));

        }

        //Arrange
        let family2 = new Family();

        let newFamilyId2 = tree.addNewFamily(family2);

        expect(newFamilyId2?.itemLink).to.equal("F2");

        let result = tree.addChildToFamily(new FamilyLink("F2"), new ProfileLink("P1"));

        //Arrange
        if (newFamilyId2 != undefined) {

            let newProfile3 = createProfile("Thelma Andersson", ProfileSex.Female, "18830303", "Umeå, Sweden", "19230303", "Vännäs, Sweden");

            let newProfileId3 = tree.addNewProfile(newProfile3);

            let result4 = tree.addParentToFamily(new FamilyLink("F2"), new ProfileLink("P3"));


        }
        let mainLayout = createFamilyLayout(tree, newProfileId1, 1, 1);

        expect(mainLayout.families.size).to.equal(1);
        expect(mainLayout.profiles.size).to.equal(2);
        let resultingLayout = generateLayout(mainLayout)
    })

});