import React, { useState } from "react";
import { ShoppingCart, Plus, Check, X, Printer, Copy, CheckSquare, Square, Trash } from "lucide-react";

export default function ShoppingList({
  shoppingList,
  onAddToList,
  onRemoveFromList,
  onToggleItemCheck,
  onClearChecked,
  onClearAll
}) {
  const [customName, setCustomName] = useState("");
  const [customQty, setCustomQty] = useState("");
  const [customUnit, setCustomUnit] = useState("pcs");
  const [customCategory, setCustomCategory] = useState("Produce");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customName.trim()) return;

    onAddToList({
      name: customName.trim().toLowerCase(),
      quantity: customQty ? parseFloat(customQty) : null,
      unit: customUnit,
      category: customCategory,
      checked: false
    });

    setCustomName("");
    setCustomQty("");
  };

  // Group items by category
  const groupedItems = shoppingList.reduce((acc, item) => {
    const cat = item.category || "Pantry";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  // Copy shopping list to clipboard
  const handleCopy = () => {
    const text = shoppingList
      .map(item => {
        const qty = item.quantity ? `${item.quantity} ${item.unit} ` : "";
        const mark = item.checked ? "[x]" : "[ ]";
        return `${mark} ${qty}${item.name} (${item.category})`;
      })
      .join("\n");
    
    navigator.clipboard.writeText(text);
    alert("Shopping list copied to clipboard!");
  };

  // Print shopping list
  const handlePrint = () => {
    window.print();
  };

  const totalItems = shoppingList.length;
  const checkedItems = shoppingList.filter(item => item.checked).length;

  return (
    <div className="shopping-container glassmorphic card">
      <div className="shopping-header no-print">
        <div className="title-area">
          <ShoppingCart className="icon text-primary animate-pulse" />
          <h2>My Smart Shopping List</h2>
        </div>
        <p className="subtitle">Track missing ingredients needed to complete your recipes. Check off items as you buy them.</p>
      </div>

      {/* Stats bar */}
      <div className="shopping-stats no-print">
        <span>Checked {checkedItems} of {totalItems} items</span>
        <div className="action-buttons-list">
          {totalItems > 0 && (
            <>
              <button className="text-btn print" onClick={handlePrint}>
                <Printer size={14} />
                <span>Print</span>
              </button>
              <button className="text-btn copy" onClick={handleCopy}>
                <Copy size={14} />
                <span>Copy</span>
              </button>
              <button className="text-btn clear" onClick={onClearChecked}>
                <span>Clear Bought</span>
              </button>
              <button className="text-btn clear-all" onClick={onClearAll}>
                <Trash size={14} />
                <span>Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* List Layout */}
      <div className="shopping-body-layout">
        {/* Add custom item form */}
        <div className="add-custom-item-card glassmorphic no-print">
          <h3>Add Custom Item</h3>
          <form onSubmit={handleSubmit} className="custom-item-form">
            <div className="form-group">
              <label>Item Name *</label>
              <input
                type="text"
                placeholder="e.g. olive oil"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                required
              />
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label>Qty</label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="e.g. 1"
                  value={customQty}
                  onChange={(e) => setCustomQty(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Unit</label>
                <select value={customUnit} onChange={(e) => setCustomUnit(e.target.value)}>
                  <option value="pcs">pcs</option>
                  <option value="cups">cups</option>
                  <option value="oz">oz</option>
                  <option value="tbsp">tbsp</option>
                  <option value="tsp">tsp</option>
                  <option value="block">block</option>
                  <option value="can">can</option>
                  <option value="stalks">stalks</option>
                  <option value="slices">slices</option>
                  <option value="g">grams</option>
                </select>
              </div>

              <div className="form-group">
                <label>Category</label>
                <select value={customCategory} onChange={(e) => setCustomCategory(e.target.value)}>
                  <option value="Produce">Produce</option>
                  <option value="Proteins">Proteins</option>
                  <option value="Grains">Grains</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Pantry">Pantry</option>
                  <option value="Canned Goods">Canned Goods</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary add-item-submit">
              <Plus size={16} />
              <span>Add to List</span>
            </button>
          </form>
        </div>

        {/* Display grouped grocery list */}
        <div className="grocery-list-display">
          {totalItems === 0 ? (
            <div className="empty-shopping-placeholder">
              <div className="shopping-cart-art">🛒</div>
              <p>Your shopping list is empty! View a recipe's ingredient list and click 'Add' on missing ingredients to add them here.</p>
            </div>
          ) : (
            <div className="printable-list-container">
              <h3 className="print-only-title">Leftover Food Generator - Shopping List</h3>
              {Object.keys(groupedItems).map(category => (
                <div key={category} className="shopping-category-block">
                  <h4 className="shopping-cat-title">{category}</h4>
                  <ul className="shopping-items-list">
                    {groupedItems[category].map((item, idx) => (
                      <li key={idx} className={`shopping-item-row ${item.checked ? "bought" : ""}`}>
                        <div className="shopping-item-left" onClick={() => onToggleItemCheck(item.name)}>
                          <span className="checkbox-shopping no-print">
                            {item.checked ? <CheckSquare className="text-primary" size={18} /> : <Square size={18} />}
                          </span>
                          <span className="print-only-checkbox print-only">[ ]</span>
                          
                          <div className="item-text-block">
                            <span className={`item-name font-semibold ${item.checked ? "line-through text-muted" : ""}`}>
                              {item.name}
                            </span>
                            {item.quantity && (
                              <span className="item-qty-tag font-mono text-muted">
                                {item.quantity} {item.unit}
                              </span>
                            )}
                          </div>
                        </div>

                        <button 
                          className="btn-remove-shopping-item no-print"
                          onClick={() => onRemoveFromList(item.name)}
                          title="Remove item"
                        >
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
