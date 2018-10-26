export class ProductQuantityService {
  public quantity = {
    Electronics: 2,
    Sports: 10,
    Footwear: 5,
    Clothes: 5,
    Stationary: 10,
    Toys: 5,
    Utility: 5
  };

  constructor() {
  }

  checkQuantity(textValue: number, originalQuantity: number, category: string) {
    switch (category) {
      case 'Electronics':
        if (originalQuantity === 1) {
          return originalQuantity;
        }
        if (textValue === this.quantity.Electronics) {
          return textValue;
        } else if (textValue <= originalQuantity) {
          if (textValue > this.quantity.Electronics) {
            return this.quantity.Electronics;
          } else {
            if (textValue === 0) {
              return 1;
            }
            return textValue;
          }
        } else if (textValue >= originalQuantity) {
          if (originalQuantity <= this.quantity.Electronics) {
            return originalQuantity;
          }
          return this.quantity.Electronics;
        }
        break;

      case 'Sports':
        if (originalQuantity === 1) {
          return originalQuantity;
        }
        if (textValue === this.quantity.Sports) {
          if (originalQuantity <= textValue) {
            return originalQuantity;
          }
          return textValue;
        } else if (textValue <= originalQuantity) {
          if (textValue > this.quantity.Sports) {
            return this.quantity.Sports;
          } else {
            if (textValue === 0) {
              return 1;
            }
            return textValue;
          }
        } else if (textValue >= originalQuantity) {
          if (originalQuantity <= this.quantity.Sports) {
            return originalQuantity;
          }
          return this.quantity.Sports;
        }
        break;

      case 'Footwear':
        if (originalQuantity === 1) {
          return originalQuantity;
        }
        if (textValue === this.quantity.Footwear) {
          if (originalQuantity <= textValue) {
            return originalQuantity;
          }
          return textValue;
        } else if (textValue <= originalQuantity) {
          if (textValue > this.quantity.Footwear) {
            return this.quantity.Footwear;
          } else {
            if (textValue === 0) {
              return 1;
            }
            return textValue;
          }
        } else if (textValue >= originalQuantity) {
          if (originalQuantity <= this.quantity.Footwear) {
            return originalQuantity;
          }
          return this.quantity.Footwear;
        }
        break;
      case 'Clothes':
        if (originalQuantity === 1) {
          return originalQuantity;
        }
        if (textValue === this.quantity.Clothes) {
          if (originalQuantity <= textValue) {
            return originalQuantity;
          }
          return textValue;
        } else if (textValue <= originalQuantity) {
          if (textValue > this.quantity.Clothes) {
            return this.quantity.Clothes;
          } else {
            if (textValue === 0) {
              return 1;
            }
            return textValue;
          }
        } else if (textValue >= originalQuantity) {
          if (originalQuantity <= this.quantity.Clothes) {
            return originalQuantity;
          }
          return this.quantity.Clothes;
        }
        break;

      case 'Stationary':
        if (originalQuantity === 1) {
          return originalQuantity;
        }
        if (textValue === this.quantity.Stationary) {
          if (originalQuantity <= textValue) {
            return originalQuantity;
          }
          return textValue;
        } else if (textValue <= originalQuantity) {
          if (textValue > this.quantity.Stationary) {
            return this.quantity.Stationary;
          } else {
            if (textValue === 0) {
              return 1;
            }
            return textValue;
          }
        } else if (textValue >= originalQuantity) {
          if (originalQuantity <= this.quantity.Stationary) {
            return originalQuantity;
          }
          return this.quantity.Stationary;
        }
        break;

      case 'Toys':
        if (originalQuantity === 1) {
          return originalQuantity;
        }
        if (textValue === this.quantity.Toys) {
          if (originalQuantity <= textValue) {
            return originalQuantity;
          }
          return textValue;
        } else if (textValue <= originalQuantity) {
          if (textValue > this.quantity.Toys) {
            return this.quantity.Toys;
          } else {
            if (textValue === 0) {
              return 1;
            }
            return textValue;
          }
        } else if (textValue >= originalQuantity) {
          if (originalQuantity <= this.quantity.Toys) {
            return originalQuantity;
          }
          return this.quantity.Toys;
        }
        break;

      case 'Utility':
        if (originalQuantity === 1) {
          return originalQuantity;
        }
        if (textValue === this.quantity.Utility) {
          if (originalQuantity <= textValue) {
            return originalQuantity;
          }
          return textValue;
        } else if (textValue <= originalQuantity) {
          if (textValue > this.quantity.Utility) {
            return this.quantity.Utility;
          } else {
            if (textValue === 0) {
              return 1;
            }
            return textValue;
          }
        } else if (textValue >= originalQuantity) {
          if (originalQuantity <= this.quantity.Utility) {
            return originalQuantity;
          }
          return this.quantity.Utility;
        }
        break;
      default:
        return 1;
    }
  }
}
